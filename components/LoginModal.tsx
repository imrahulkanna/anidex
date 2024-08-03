"use client";
import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

interface props {
    closeLoginModal: (
        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
    ) => void;
}
const LoginModal = ({ closeLoginModal }: props) => {
    const handleLogin = (
        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
    ) => {
        closeLoginModal(e);
    };
    return (
        <>
            <div
                className=" bg-white/70 w-full fixed top-0 left-0 h-full z-[100] overflow-hidden"
                onClick={closeLoginModal}
            ></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[400px] h-auto z-[999] p-10 bg-black/80 backdrop-blur-xl text-neutral-300 rounded-md">
                <button
                    className="absolute -right-0 -top-0 rounded-tr-md bg-neutral-500 p-2 cursor-pointer"
                    onClick={closeLoginModal}
                >
                    <Cross2Icon stroke="10" />
                </button>
                <h3 className="text-center font-semibold text-2xl py-5">Welcome back!</h3>
                <div>
                    <form action="">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="w-full mb-6 py-2 px-4 rounded text-neutral-800 text-sm"
                            autoComplete="off"
                        />
                        {/* <div className="relative">
                            <label className="absolute left-4 top-6 -translate-y-3/4 text-neutral-800 text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full mb-6 py-2 px-4 rounded text-neutral-800 text-sm"
                                autoComplete="off"
                            />
                        </div> */}
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="w-full mb-6 py-2 px-4 rounded text-neutral-800 text-sm"
                            autoComplete="off"
                        />
                    </form>
                </div>
                <button
                    className="bg-primary w-full py-3 rounded text-neutral-800 font-bold"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </>
    );
};

export default LoginModal;
