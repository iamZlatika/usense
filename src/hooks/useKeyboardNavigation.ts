import React, { useState } from "react";

const useKeyboardNavigation = (options: string[], isOpen: boolean, closeDropdown: () => void, selectOption: (option: string) => void) => {
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (isOpen) {
            switch (event.key) {
                case "ArrowDown":
                    setFocusedIndex((prevIndex) => (prevIndex + 1) % options.length);
                    break;
                case "ArrowUp":
                    setFocusedIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
                    break;
                case "Enter":
                    if (focusedIndex >= 0) {
                        selectOption(options[focusedIndex]);
                        closeDropdown();
                    }
                    break;
                case "Escape":
                    closeDropdown();
                    break;
                default:
                    break;
            }
        } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            setFocusedIndex(0);
            closeDropdown();
        }
    };

    return {focusedIndex, handleKeyDown};
};

export default useKeyboardNavigation;
