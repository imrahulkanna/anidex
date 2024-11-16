import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { signIn } from "next-auth/react";
import OTPInput from "./OTPInput";

interface EmailVerificationProps {
    userDetails: { email: string; username: string; password: string } | undefined;
    closeLoginModal: () => void;
}

const EmailVerification = ({ userDetails, closeLoginModal }: EmailVerificationProps) => {
    const initState = { type: "", data: "" };
    const [message, setMessage] = useState(initState);
    const [resetInputValue, setResetInputValue] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (message.type === "resend") {
            setTimeout(() => {
                setMessage(initState);
            }, 3000);
        }
    }, [message]);

    const handleVerifyCode = async (code: string = "") => {
        setMessage(initState);
        setResetInputValue(false);
        if (code) {
            setIsBtnDisabled(false);
        }

        if (userDetails) {
            try {
                const requestBody = {
                    email: userDetails.email,
                    enteredCode: code,
                };

                const res = await fetch("/api/verify-email", {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(requestBody),
                });

                const data = await res.json();

                if (!res.ok) {
                    setMessage({ type: "verify", data: data.message });
                } else {
                    await signIn("credentials", {
                        email: userDetails.email,
                        password: userDetails.password,
                        redirect: false,
                    });
                    closeLoginModal();
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    const handleResend = async () => {
        setMessage(initState);
        setResetInputValue(true);
        try {
            if (userDetails) {
                const requestBody = {
                    email: userDetails.email,
                };
                const response = await fetch("/api/resend-code", {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                setMessage({ type: "resend", data: data.message });
            }
        } catch (error) {
            console.log("Failed while sending verification code");
        }
    };

    return (
        <div id="verify-email-form">
            <p className="text-center font-semibold text-2xl mb-1">Verify your Email Address</p>
            <p className="text-center text-sm mb-6 font-light">
                We've sent a code to <span className="font-semibold">{userDetails?.email}</span>
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="mb-4 h-auto">
                    <OTPInput length={6} onComplete={handleVerifyCode} />
                    {message.type === "verify" && (
                        <p className="mt-2 text-xs text-red-600 font-semibold ml-2">
                            {message.data}
                        </p>
                    )}
                </div>
                <button
                    className={`bg-neutral-100 w-full py-2 rounded text-neutral-800 font-semibold mb-2${
                        isBtnDisabled ? " opacity-50" : ""
                    }`}
                    disabled={isBtnDisabled}
                >
                    Verify
                </button>
            </form>
            <p className="text-center text-sm">
                Didn't recieve any email?{" "}
                <span
                    className="text-blue-400 underline cursor-pointer font-semibold"
                    onClick={handleResend}
                >
                    Resend
                </span>
            </p>
            {message.type === "resend" && (
                <p className="mt-2 text-xs text-green-500 font-semibold text-center">
                    {message.data}
                </p>
            )}
        </div>
    );
};

export default EmailVerification;
