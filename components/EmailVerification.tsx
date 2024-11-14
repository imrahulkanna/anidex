import React, { useState } from "react";
import InputBox from "./InputBox";
import { signIn } from "next-auth/react";

interface EmailVerificationProps {
    userDetails: { email: string; username: string; password: string } | undefined;
    closeLoginModal: () => void;
}

const EmailVerification = ({ userDetails, closeLoginModal }: EmailVerificationProps) => {
    const [message, setMessage] = useState(null);
    const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
        setMessage(null);
        e.preventDefault();
        var data = new FormData(e.currentTarget as HTMLFormElement);
        let formObject = Object.fromEntries(data.entries());

        if (userDetails) {
            try {
                const requestBody = {
                    email: userDetails.email,
                    enteredCode: formObject["verification-code"],
                };

                const res = await fetch("/api/verify-email", {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(requestBody),
                });

                const data = await res.json();

                if (!res.ok) {
                    setMessage(data.message);
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

    return (
        <div id="verify-email-form">
            <p className="text-center font-semibold text-2xl mb-1">Please check your email</p>
            <p className="text-center text-sm mb-6 font-light">
                We've sent a code to <span className="font-semibold">@example.com</span>
            </p>
            <form onSubmit={handleVerifyCode}>
                <div className="mb-4 h-auto">
                    <InputBox type="text" name="verification-code" />
                    {message && (
                        <p className="mt-2 text-xs text-red-600 font-semibold ml-2">{message}</p>
                    )}
                </div>
                <button className="bg-neutral-100 w-full py-2 rounded text-neutral-800 font-semibold mb-2">
                    Verify
                </button>
            </form>
            <p className="text-center text-sm">
                Didn't recieve any email?{" "}
                <span className="text-blue-400 underline cursor-pointer font-semibold">Resend</span>
            </p>
        </div>
    );
};

export default EmailVerification;
