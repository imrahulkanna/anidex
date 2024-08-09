"use client";
import React, { useState } from "react";
import { Cross2Icon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import InputBox from "./InputBox";
import Link from "next/link";

interface props {
    closeLoginModal: (
        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
    ) => void;
}
const LoginModal = ({ closeLoginModal }: props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = (
        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
    ) => {
        closeLoginModal(e);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div
                className=" bg-white/70 w-full fixed top-0 left-0 h-full z-[100] cursor-pointer"
                onClick={closeLoginModal}
            ></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[400px] h-auto z-[999] p-10 bg-neutral-800 backdrop-blur-xl text-neutral-300 rounded-md">
                <div>
                    <button
                        className="absolute -right-0 -top-0 rounded-tr-md bg-neutral-700 p-2 cursor-pointer border-l border-b border-neutral-500"
                        onClick={closeLoginModal}
                    >
                        <Cross2Icon stroke="10" />
                    </button>
                    <h3 className="text-center font-semibold text-2xl py-5">Welcome back!</h3>
                    <form className="flex flex-col gap-6 mb-8 items-end h-auto">
                        <InputBox type="email" placeholder="Email" />
                        <InputBox type={showPassword ? "text" : "password"} placeholder="Password">
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
                    </form>
                    <button
                        className="bg-primary w-full py-3 mb-4 rounded text-neutral-800 font-bold"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <button
                        className="bg-neutral-100 w-full py-3 rounded text-neutral-800 font-bold"
                        onClick={handleLogin}
                    >
                        Register
                    </button>
                </div>
                <div className="w-full my-10 flex justify-center items-center gap-1">
                    <div className="w-full h-px bg-neutral-500" />
                    <p className="">or</p>
                    <div className="w-full h-px bg-neutral-500" />
                </div>
                <div>login with google</div>
            </div>
        </>
    );
};

export default LoginModal;
