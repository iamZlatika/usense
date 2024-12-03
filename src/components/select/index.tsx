import { currencies } from "./data.ts";
import './styles.css'
import CustomSelect from "./custom-select";
import React from "react";

interface ISelect {
    currency: string;
    value: number;
    onValueChange: (value: string) => void;
    onCurrencySelect: (currency: string) => void;
}

const Select = ({currency, value, onValueChange, onCurrencySelect}: ISelect) => {

    return (
        <div className="select">
            <input
                value={value}
                className="select__input"
                type="text"
                inputMode="numeric"
                onChange={(e) => onValueChange(e.target.value)}
            />
            <div className="select__divider"></div>
            <CustomSelect
                options={currencies}
                selectedOption={currency}
                onSelect={onCurrencySelect}
            />
        </div>
    )
}

export default Select