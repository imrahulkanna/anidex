import { useState } from "react";

interface props {
    type: string;
    placeholder: string;
    children?: React.ReactNode;
}

const InputBox = ({ children, type, placeholder }: props) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInputValue(e.target.value);
    };

    const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
        (e.target as HTMLInputElement).select();
    };

    return (
        <div className="relative w-full" id={`${placeholder}-container`}>
            <input
                type={type}
                value={inputValue}
                name={type}
                id={placeholder}
                placeholder={placeholder}
                className={`w-full py-2 px-4 rounded bg-neutral-700 text-neutral-100 text-sm border border-neutral-500 focus:outline-none focus:border-primary peer ${
                    children ? "pr-8" : ""
                }`.trim()}
                autoComplete="off"
                spellCheck={false}
                onChange={handleInputChange}
                onClick={handleOnClick}
            ></input>
            {children}
        </div>
    );
};

export default InputBox;
