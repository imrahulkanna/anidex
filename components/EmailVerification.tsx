import React from "react";
import InputBox from "./InputBox";

interface EmailVerificationProps {
    userDetails: object | undefined
}

const EmailVerification = ({ userDetails }: EmailVerificationProps) => {
    const handleVerifyCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var data = new FormData(e.currentTarget as HTMLFormElement);
        let formObject = Object.fromEntries(data.entries());
        console.log("formObject", formObject);
        console.log("userDetails", userDetails);
        
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
