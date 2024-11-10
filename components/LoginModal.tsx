"use client";
import React, { useState, useEffect } from "react";
import { Cross2Icon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import InputBox from "./InputBox";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Logo from "./Logo";
import Image from "next/image";
import SignUpForm from "./SignUpForm";
import EmailVerification from "./EmailVerification";

interface props {
    closeLoginModal: () => void;
}
interface signInFormProps {
    setCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
    closeLoginModal: props["closeLoginModal"];
}

const CreateAccount = ({ setCreateAccount }: signInFormProps) => {
    const [showSignUpForm, setShowSignUpForm] = useState<boolean>(true);
    const [userDetails, setUserDetails] = useState<object>({});
    return (
        <>
            {showSignUpForm ? (
                <SignUpForm
                    setShowSignUpForm={setShowSignUpForm}
                    setCreateAccount={setCreateAccount}
                    setUserDetails={setUserDetails}
                />
            ) : (
                <EmailVerification userDetails={userDetails} />
            )}
        </>
    );
};

const SignInForm = ({ setCreateAccount, closeLoginModal }: signInFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var data = new FormData(e.currentTarget as HTMLFormElement);
        let formObject = Object.fromEntries(data.entries());

        const button = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

        if (button.value === "create-account") {
            setCreateAccount(true);
        } else if (button.value === "signin") {
            try {
                await signIn("credentials", {
                    email: formObject.email,
                    password: formObject.password,
                    redirect: false,
                });
                closeLoginModal();
            } catch (error) {
                
            }
        } else {
            signIn(button.value);
        }
    };

    return (
        <div id="sign-in-form">
            <h3 className="text-center font-semibold text-2xl pb-5">Welcome back!</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 mb-6 items-end h-auto">
                    <InputBox type="email" placeholder="Email" name="email" />
                    <InputBox type={showPassword ? "text" : "password"} placeholder="Password" name="password">
                        <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-[51] cursor-pointer"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </div>
                    </InputBox>
                    <Link href="#" className="text-blue-400 text-sm -mt-4">
                        Forgot password?
                    </Link>
                </div>
                <button
                    className="bg-primary w-full py-2 mb-4 rounded text-neutral-800 font-semibold"
                    type="submit"
                    value="signin"
                >
                    Sign In
                </button>
                <button
                    className="bg-neutral-100 w-full py-2 rounded text-neutral-800 font-semibold"
                    type="submit"
                    value="create-account"
                >
                    Create an account
                </button>
                <div className="w-full mt-6 mb-4 flex justify-center items-center gap-1">
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

const LoginModal = ({ closeLoginModal }: props) => {
    const [createAccount, setCreateAccount] = useState(false);

    useEffect(() => {
        const body = document.querySelector("body");
        body?.classList.add("overflow-hidden");
        return () => {
            body?.classList.remove("overflow-hidden");
        };
    }, []);

    return (
        <div>
            <div
                className=" bg-black/50 w-full fixed top-0 left-0 h-full z-[100]"
                onClick={closeLoginModal}
            ></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[440px] h-auto z-[999] p-10 bg-white/5 backdrop-blur-md text-neutral-300 rounded-md border border-white/20">
                <button
                    className="absolute -right-0 -top-0 rounded-tr-md m-2 cursor-pointer hover:scale-150"
                    onClick={closeLoginModal}
                >
                    <Cross2Icon stroke="10" />
                </button>
                <div className="flex items-center justify-center pb-2">
                    <Logo width={150} height={50} />
                </div>
                {createAccount ? (
                    <CreateAccount setCreateAccount={setCreateAccount} closeLoginModal={closeLoginModal} />
                ) : (
                    <SignInForm setCreateAccount={setCreateAccount} closeLoginModal={closeLoginModal} />
                )}
            </div>
        </div>
    );
};

export default LoginModal;
