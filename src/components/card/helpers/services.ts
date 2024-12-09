import { TRate } from "../../../helpers/types";
import { TSelectValue } from "./types";

export const convertCurrency = (
  rates: TRate,
  innerValue: TSelectValue,
  toCurrency: string
): number => {
  if (innerValue.currency === toCurrency) return innerValue.amount;
  const rateFrom = rates[innerValue.currency];
  const rateTo = rates[toCurrency];
  if (innerValue.currency === "UAH") {
    return parseFloat((innerValue.amount / rateTo).toFixed(2));
  }
  if (toCurrency === "UAH") {
    return parseFloat((innerValue.amount * rateFrom).toFixed(2));
  }

  const amountInUAH = innerValue.amount * rateFrom;
  const result = amountInUAH / rateTo;
  return parseFloat(result.toFixed(2));
};

export const validateAmountChange = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
};
