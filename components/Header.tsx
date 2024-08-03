"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import LoginModal from "./LoginModal";

const Header = ({ rowdies }: { rowdies: any }) => {
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

    const handleLoginModal = (
        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        setOpenLoginModal(!openLoginModal);
    };

    if (openLoginModal) {
        const body = document.querySelector("body");
        body?.classList.add("overflow-hidden");
    }
    return (
        <>
            <header className="z-50 top-0 left-1/2 right-0 -translate-x-1/2 fixed w-full bg-neutral-800/80 backdrop-blur">
                <div className="w-full max-w-[1800px] mx-auto px-4 md:px-10 3xl:px-2 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Image src="/anidex-logo.png" alt="anidex logo" width={50} height={50} />
                        <p className={`text-4xl font-extrabold text-primary ${rowdies.className}`}>
                            AniDex
                        </p>
                    </div>
                    <Button
                        variant="secondary"
                        className="bg-primary font-semibold hover:bg-primary/80 hover:scale-105"
                        onClick={handleLoginModal}
                    >
                        Login
                    </Button>
                </div>
            </header>
            {openLoginModal && <LoginModal closeLoginModal={handleLoginModal} />}
        </>
    );
};

export default Header;
