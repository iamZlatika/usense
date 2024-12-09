import { TRate } from "./types";

const getCurrency = (rate: number) => parseFloat((1 / rate).toFixed(2))


export const filterRates = (rates: TRate, currencies: string[]): TRate => {
    const filteredRates: TRate = {};

  currencies.forEach((currency) => {
    if (rates[currency] !== undefined) {
      filteredRates[currency] = getCurrency(rates[currency]);
    }
  });

  return filteredRates;
  };