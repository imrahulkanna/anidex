import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import InputBox from "./InputBox";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { constructUrl } from "@/app/lib/fetch";

interface userNameErrorType {
    success: boolean;
    message?: string;
}

interface SignUpFormProps {
    setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
    setUserDetails: React.Dispatch<React.SetStateAction<object>>;
}

const SignUpForm = ({
    setShowSignUpForm = () => {},
    setCreateAccount = () => {},
    setUserDetails,
}: SignUpFormProps) => {
    let controller: null | undefined | AbortController = null;
    const initUsernameValue = {
        success: true,
    };
    const [usernameError, setUsernameError] = useState<userNameErrorType>(initUsernameValue);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (usernameError.success && usernameError.message) {
            setTimeout(() => {
                setUsernameError(initUsernameValue);
            }, 3000);
        }
    }, [usernameError]);

    const openSignInForm = () => {
        setCreateAccount(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUsernameCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (controller) {
                controller.abort();
            }
            controller = new AbortController();
            const signal = controller.signal;

            const inputValue = e.target.value;
            if (inputValue.length <= 2) {
                setUsernameError(initUsernameValue);
                return;
            }

            const queryParams = {
                username: inputValue,
            };
            const url = constructUrl("/api/check-username-unique", queryParams);

            const res = await fetch(url, {
                signal,
                method: "POST",
                cache: "no-cache",
            });
            const data = await res.json();
            setUsernameError(data);
        } catch (error) {
            console.log("failed checking username");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var data = new FormData(e.currentTarget as HTMLFormElement);
        let formObject = Object.fromEntries(data.entries());

        const button = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

        if (button.value === "signup") {
            const requestBody = {
                username: formObject.username,
                email: formObject.email,
                password: formObject.password,
            };
            console.log("requestBody", requestBody);

            const res = await fetch("/api/sign-up", {
                method: "POST",
                cache: "no-cache",
                body: JSON.stringify(requestBody),
            });

            setUserDetails(requestBody);
            setShowSignUpForm(false);
        } else {
            signIn(button.value);
        }
    };

    return (
        <div id="sign-up-form">
            <h3 className="text-center font-semibold text-2xl pb-5">Create an account</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 mb-6 items-end h-auto">
                    <div className="flex gap-5">
                        <InputBox type="text" placeholder="First Name" name="firstname" />
                        <InputBox type="text" placeholder="Last Name" name="lastname" />
                    </div>
                    <div className="flex flex-col w-full">
                        <InputBox
                            type="text"
                            placeholder="Username"
                            onInputChange={handleUsernameCheck}
                            name="username"
                        />
                        {!usernameError?.success ? (
                            <p className="mt-2 text-xs text-red-600 font-semibold ml-2">
                                {usernameError?.message}
                            </p>
                        ) : (
                            usernameError?.message && (
                                <p className="mt-2 text-xs text-green-500 font-semibold ml-2">
                                    {usernameError?.message}
                                </p>
                            )
                        )}
                    </div>
                    <InputBox type="email" placeholder="Email Address" name="email" />
                    <InputBox
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                    >
                        <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-[51] cursor-pointer"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </div>
                    </InputBox>
                </div>
                <button
                    className="bg-primary w-full py-2 mb-4 rounded text-neutral-800 font-semibold"
                    type="submit"
                    value="signup"
                >
                    Sign Up
                </button>
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <span className="text-blue-400 underline cursor-pointer" onClick={openSignInForm}>
                        Sign In
                    </span>
                </p>
                <div className="w-full my-6 flex justify-center items-center gap-1">
                    <div className="w-full h-px bg-neutral-500" />
                    <p className="">or</p>
                    <div className="w-full h-px bg-neutral-500" />
                </div>
                <button
                    className="bg-neutral-100 w-full py-2 rounded text-neutral-800 font-medium flex gap-2 items-center justify-center"
                    type="submit"
                    name="action"
                    value="google"
                >
                    <Image src="/googleLogo.png" height={20} width={20} alt="google-logo" />
                    Continue with Google
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
