import './styles.css'
import Select from "../select";
import React, { useState } from "react";
import { TCurrency } from "./types.ts";

interface ICard {
    dollarRate: number;
    euroRate: number;
}

const Card = ({dollarRate, euroRate}: ICard) => {
    const currencies = {
        UAH: 1,
        USD: dollarRate,
        EUR: euroRate,
    };
    const [firstValue, setFirstValue] = useState<number>(currencies.EUR);
    const [firstCurrency, setFirstCurrency] = useState<TCurrency>("UAH");
    const [secondValue, setSecondValue] = useState<number>(currencies.UAH);
    const [secondCurrency, setSecondCurrency] = useState<TCurrency>("EUR");


    const convertCurrency = (
        amount: number,
        fromCurrency: string,
        toCurrency: string
    ): number => {
        if (fromCurrency === toCurrency) return amount;
        const rateFrom = currencies[fromCurrency];
        const rateTo = currencies[toCurrency];
        if (fromCurrency === "UAH") {
            return parseFloat((amount / rateTo).toFixed(2));
        }
        if (toCurrency === "UAH") {
            return parseFloat((amount * rateFrom).toFixed(2));
        }

        const amountInUAH = amount * rateFrom;
        const result = amountInUAH / rateTo;
        return parseFloat(result.toFixed(2));
    };

    const handleAmountChange = (
        value: string,
        setCurrentValue: React.Dispatch<React.SetStateAction<number>>,
        setOtherValue: React.Dispatch<React.SetStateAction<number>>,
        fromCurrency: string,
        toCurrency: string
    ) => {
        const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
        const validValue = isNaN(numericValue) ? 0 : numericValue;
        if (typeof setCurrentValue === 'function' && typeof setOtherValue === 'function') {
            setCurrentValue(validValue);
            setOtherValue(convertCurrency(validValue, fromCurrency, toCurrency));
        }
    };


    const handleFirstAmountChange = (value: string) => {
        handleAmountChange(value, setFirstValue, setSecondValue, firstCurrency, secondCurrency)
    };

    const handleSecondAmountChange = (value: string) => {
        handleAmountChange(value, setSecondValue, setFirstValue, secondCurrency, firstCurrency);
    };

    const handleFirstCurrencyChange = (currency: TCurrency) => {
        setFirstCurrency(currency);
        setSecondValue(convertCurrency(firstValue, currency, secondCurrency));
    };

    const handleSecondCurrencyChange = (currency: TCurrency) => {
        setSecondCurrency(currency);
        setFirstValue(convertCurrency(secondValue, currency, firstCurrency));
    };

    return (
        <div className="card component">
            <h2 className="card__title">Enter the amount and select the currency for conversion.</h2>
            <div className="card__container">
                <Select
                    value={firstValue}
                    currency={firstCurrency}
                    onValueChange={handleFirstAmountChange}
                    onCurrencySelect={handleFirstCurrencyChange}
                />
                <Select
                    value={secondValue}
                    currency={secondCurrency}
                    onValueChange={handleSecondAmountChange}
                    onCurrencySelect={handleSecondCurrencyChange}
                />
            </div>
        </div>
    )
}

export default Card