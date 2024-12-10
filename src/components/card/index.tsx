import './styles.css'
import Select from "../select";
import { useState } from "react";
import { TRate } from '../../helpers/types.ts';
import { TSelectValue } from './helpers/types.ts';
import { convertCurrency, validateAmountChange } from './helpers/services.ts';

interface ICard {
    rates: TRate,
}

const Card = ({ rates }: ICard) => {

    const defaultFirstSelectValue = {
        amount: rates.EUR,
        currency: "UAH"
    }
    const defaultSecondSelectValue = {
        amount: rates.UAH,
        currency: "EUR"
    }

    const [firstValue, setFirstValue] = useState<TSelectValue>(defaultFirstSelectValue);
    const [secondValue, setSecondValue] = useState<TSelectValue>(defaultSecondSelectValue);


    const handleFirstAmountChange = (value: string) => {
        const firstSelectValue = { ...firstValue, amount: validateAmountChange(value) }

        setFirstValue(firstSelectValue)
        setSecondValue({ ...secondValue, amount: convertCurrency(rates, firstSelectValue, secondValue.currency) })
    };

    const handleSecondAmountChange = (value: string) => {
        const secondSelectValue = { ...secondValue, amount: validateAmountChange(value) }

        setSecondValue(secondSelectValue)
        setFirstValue({ ...firstValue, amount: convertCurrency(rates, secondSelectValue, firstValue.currency) })
    };


    const handleFirstCurrencyChange = (currency: string) => {
        const innerValue = { currency, amount: firstValue.amount }
        setFirstValue(innerValue);
        setSecondValue({ ...secondValue, amount: convertCurrency(rates, innerValue, secondValue.currency) });
    };

    const handleSecondCurrencyChange = (currency: string) => {
        const innerValue = { currency, amount: secondValue.amount }
        setSecondValue(innerValue);
        setFirstValue({ ...firstValue, amount: convertCurrency(rates, innerValue, firstValue.currency) });
    };

    return (
        <div className="card component">
            <h2 className="card__title">Enter the amount and select the currency for conversion.</h2>
            <div className="card__container">
                <Select
                    value={firstValue.amount}
                    currency={firstValue.currency}
                    onValueChange={handleFirstAmountChange}
                    onCurrencySelect={handleFirstCurrencyChange}
                />
                <Select
                    value={secondValue.amount}
                    currency={secondValue.currency}
                    onValueChange={handleSecondAmountChange}
                    onCurrencySelect={handleSecondCurrencyChange}
                />
            </div>
        </div>
    )
}

export default Card