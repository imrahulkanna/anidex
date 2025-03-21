import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import InputBox from "./InputBox";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { constructUrl } from "@/app/lib/fetch";
import { userDetailsType } from "./LoginModal";
import { useLoading } from "@/context/LoadingContext";

interface userNameErrorType {
    success: boolean;
    message?: string;
}

interface SignUpFormProps {
    setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
    setUserDetails: React.Dispatch<React.SetStateAction<userDetailsType>>;
}

const SignUpForm = ({ setShowSignUpForm, setCreateAccount, setUserDetails }: SignUpFormProps) => {
    const controllerRef = useRef<AbortController | null>(null);
    const initUsernameValue = {
        success: true,
    };
    const initFormData = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    };
    const { setLoading } = useLoading();
    const [formData, setFormData] = useState(initFormData);
    const [usernameError, setUsernameError] = useState<userNameErrorType>(initUsernameValue);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [signUpError, setSignUpError] = useState<string>("");

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

    const handleInputChange = async (name: string, value: string) => {
        if (name === "username") {
            setFormData({ ...formData, username: value });
            try {
                if (controllerRef.current) {
                    controllerRef.current.abort();
                }
                const newController = new AbortController();
                controllerRef.current = newController;
                const signal = newController.signal;

                if (value.length <= 2) {
                    setUsernameError(initUsernameValue);
                    return;
                }

                const queryParams = {
                    username: value,
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
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSignUpError("");

        const button = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const name = `${formData.firstName} ${formData.lastName}`;

        try {
            if (button.value === "signup") {
                const requestBody = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    name: name,
                };

                const res = await fetch("/api/sign-up", {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(requestBody),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                setUserDetails(requestBody);
                setShowSignUpForm(false);
            } else {
                signIn(button.value);
            }
        } catch (error) {
            console.log("Error creating account", error);
            setSignUpError("Error registering user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="sign-up-form">
            <h3 className="text-center font-semibold text-2xl pb-5">Create an account</h3>
            <form onSubmit={handleSubmit}>
                {signUpError && (
                    <li className="bg-red-300 text-red-800 font-semibold rounded-md text-sm py-1 px-2 mb-4">
                        {signUpError}
                    </li>
                )}
                <div className="flex flex-col gap-6 mb-6 items-end h-auto">
                    <div className="flex gap-5">
                        <InputBox
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            inputValue={formData.firstName}
                            onInputChange={handleInputChange}
                        />
                        <InputBox
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            inputValue={formData.lastName}
                            onInputChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <InputBox
                            type="text"
                            placeholder="Username"
                            name="username"
                            inputValue={formData.username}
                            onInputChange={handleInputChange}
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
                    <InputBox
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        inputValue={formData.email}
                        onInputChange={handleInputChange}
                    />
                    <InputBox
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        inputValue={formData.password}
                        onInputChange={handleInputChange}
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
                    <span
                        className="text-blue-400 underline cursor-pointer"
                        onClick={openSignInForm}
                    >
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
