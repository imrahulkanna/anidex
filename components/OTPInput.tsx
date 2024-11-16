import React, { useEffect, useRef, useState } from "react";
import { log } from "util";

interface OTPInputProps {
    length: number;
    onComplete: () => void;
}

const OTPInput = ({ length, onComplete }: OTPInputProps) => {
    const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
    const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current[0]?.focus();
        }
    }, []);

    const handleInputChange = (input: string, index: number) => {
        const newOTP = [...OTP];
        input = input[input.length - 1] ?? "";
        newOTP[index] = input;
        setOTP(newOTP);

        if (input.length === 1 && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        console.log("index", index);

        if (e.key === "Backspace") {
            if (OTP[index] === "" && index > 0) {
                inputRef.current[index - 1]?.focus();
            }
        } 
        // else if (OTP[index].match(/^\d$/)) {
        //     if (index < length - 1) {
        //         inputRef.current[index + 1]?.focus();
        //     }
        // }
    };
    return (
        <div className={`w-full flex justify-between gap-4 mb-4`}>
            {Array.from({ length }, (_, index) => (
                <input
                    key={index}
                    type="text"
                    value={OTP[index]}
                    ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                    className="w-1/6 h-[46px] rounded-md bg-neutral-700 text-neutral-100 border border-neutral-500 focus:outline-none focus:border-primary peer text-center text-xl"
                    autoComplete="off"
                    spellCheck={false}
                />
            ))}
        </div>
    );
};

export default OTPInput;
