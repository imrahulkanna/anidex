"use client";
import React, { useState, useEffect } from "react";
import { Cross2Icon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import InputBox from "./InputBox";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface props {
    closeLoginModal: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => void;
}

const LoginModal = ({ closeLoginModal }: props) => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const body = document.querySelector("body");
        body?.classList.add("overflow-hidden");
        return () => {
            body?.classList.remove("overflow-hidden");
        };
    }, []);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit button clicked");
        var data = new FormData(e.currentTarget as HTMLFormElement);
        let formObject = Object.fromEntries(data.entries());
        console.log("data", data);

        const button = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        if (["signin", "signup"].includes(button.value)) {
            signIn("credentials", {
                email: formObject.email,
                password: formObject.password,
                redirect: false,
            })
        } else {
            signIn(button.value);
        }
    };

    return (
        <div>
            <div
                className=" bg-black/50 w-full fixed top-0 left-0 h-full z-[100]"
                onClick={closeLoginModal}
            ></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[400px] h-auto z-[999] p-10 bg-white/5 backdrop-blur-md text-neutral-300 rounded-md border border-white/20">
                <div>
                    <button
                        className="absolute -right-0 -top-0 rounded-tr-md m-2 cursor-pointer hover:scale-150"
                        onClick={closeLoginModal}
                    >
                        <Cross2Icon stroke="10" />
                    </button>
                    <h3 className="text-center font-semibold text-2xl py-5">Welcome back!</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 mb-6 items-end h-auto">
                            <InputBox type="email" placeholder="Email" />
                            <InputBox
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            >
                                <div
                                    className="invisible peer-focus:visible hover:visible absolute right-2 top-1/2 -translate-y-1/2 z-[51] cursor-pointer"
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
                            className="bg-primary w-full py-2 mb-4 rounded text-neutral-800 font-bold"
                            type="submit"
                            value="signin"
                        >
                            Sign In
                        </button>
                        <button
                            className="bg-neutral-100 w-full py-2 rounded text-neutral-800 font-bold"
                            type="submit"
                            value="signup"
                        >
                            Create an account
                        </button>
                        <div className="w-full mt-6 mb-4 flex justify-center items-center gap-1">
                            <div className="w-full h-px bg-neutral-500" />
                            <p className="">or</p>
                            <div className="w-full h-px bg-neutral-500" />
                        </div>
                        <button
                            className="bg-neutral-100 w-full py-1 rounded text-neutral-800 font-bold"
                            type="submit"
                            name="action"
                            value="google"
                        >
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
