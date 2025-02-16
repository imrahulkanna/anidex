import React, { useEffect, useRef, useState } from "react";
import { isNumeric } from "@/app/lib/utils";

interface OTPInputProps {
    length: number;
    onComplete: (otp: string) => void;
}

const OTPInput = ({ length, onComplete }: OTPInputProps) => {
    const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
    const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current[0]?.focus();
        }
    }, []);

    useEffect(() => {
        if (OTP.every(digit => digit != "")) {
            onComplete(OTP.join(""))
        }
    }, [OTP]);

    const handleInputChange = (input: string, index: number) => {
        if (!(isNumeric(input) || input === "")) return;

        const newOTP = [...OTP];
        newOTP[index] = input;
        setOTP(newOTP);

        if (input.length === 1 && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (OTP[index] === "" && index > 0) {
                inputRef.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRef.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const data = e.clipboardData?.getData("text").split("");
        if (data.every(digit => isNumeric(digit))) {
            setOTP(data);
        }
    };
    return (
        <div className={`w-full flex justify-between gap-4 mb-4`}>
            {Array.from({ length }, (_, index) => (
                <input
                    key={index}
                    type="text"
                    value={OTP[index]}
                    ref={(ref) => {inputRef.current[index] = ref as HTMLInputElement;}}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                    className="w-1/6 h-[46px] rounded-md bg-neutral-700 text-neutral-100 border border-neutral-500 focus:outline-none focus:border-primary peer text-center text-xl"
                    autoComplete="off"
                    spellCheck={false}
                    maxLength={1}
                    onPaste={(e) => handlePaste(e)}
                />
            ))}
        </div>
    );
};

export default OTPInput;
