import { useState, useRef, useEffect } from "react";
import useKeyboardNavigation from "../../../hooks/useKeyboardNavigation.ts";
import "./styles.css";

interface CustomSelectProps {
    options: string[];
    onSelect: (selected: string) => void;
    selectedOption: string;
}

const CustomSelect = ({options, onSelect, selectedOption}: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeDropdown = () => setIsOpen(false);
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const selectOption = (option: string) => {
        onSelect(option);
        closeDropdown();
    };

    const {focusedIndex, handleKeyDown} = useKeyboardNavigation(
        options,
        isOpen,
        closeDropdown,
        selectOption
    );

    return (
        <div
            className="custom-select"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={wrapperRef}
        >
            <div className="select-wrapper" onClick={toggleDropdown}>
                <span>{selectedOption}</span>
                <div className={`arrow ${isOpen ? "open" : ""}`}/>
            </div>
            <ul ref={dropdownRef} className={`options-list ${isOpen ? "open" : ""}`}>
                {options.map((option, index) => (
                    <li
                        key={option}
                        className={`option ${index === focusedIndex ? "focused" : ""}`}
                        onClick={() => selectOption(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomSelect;
