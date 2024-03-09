import React from 'react';
import "./Button.css"

interface IButton {
    type?: "red" | "white1" | "white2",
    children: React.ReactNode
    name?: string,
    size?: "small" | "medium" | "large",
    onClick: () => any,
    selected?: boolean,
    disabled?: boolean
}

const Button = ({children, name, type="red", size="medium", onClick, selected, disabled}: IButton) => {
    return (
        <button className={`button`}
                name={name}
                disabled={disabled}
                data-type={type}
                data-size={size}
                data-sel={selected}
                onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;