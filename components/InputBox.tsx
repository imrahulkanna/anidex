interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder?: string;
    children?: React.ReactNode;
    inputValue: string;
    onInputChange?: (name: string, value: string) => void;
    name?: string;
    readOnly?: boolean;
    colorStyling?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
    children,
    type,
    placeholder,
    inputValue,
    onInputChange,
    name,
    readOnly,
    colorStyling,
    ...props
}) => {
    const style = colorStyling ? colorStyling : "bg-neutral-700 text-neutral-100";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onInputChange && onInputChange(e.target.name, e.target.value);
    };

    const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
        (e.target as HTMLInputElement).select();
    };

    return (
        <div className="relative w-full" id={`${placeholder}-container`}>
            <input
                type={type}
                value={inputValue}
                name={name}
                id={placeholder}
                placeholder={placeholder}
                className={`w-full py-2 px-4 rounded text-sm border border-neutral-500 focus:outline-none focus:border-primary peer ${style} ${
                    children ? "pr-8" : ""
                } ${name === "verification-code" ? "text-center" : ""} ${
                    readOnly ? "cursor-not-allowed" : ""
                }`.trim()}
                autoComplete="off"
                spellCheck={false}
                onChange={handleInputChange}
                onClick={handleOnClick}
                readOnly={readOnly}
                {...props}
            ></input>
            {children}
        </div>
    );
};

export default InputBox;
