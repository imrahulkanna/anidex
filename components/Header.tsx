"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import LoginModal from "./LoginModal";
import { signOut, useSession } from "next-auth/react";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import Logo from "./Logo";

const Header = ({ rowdies }: { rowdies: any }) => {
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const { data: session, status } = useSession();

    const handleLoginModal = () => {
        setOpenLoginModal(!openLoginModal);
    };

    const handleLogout = (
        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        signOut();
    };

    const body = document.querySelector("body");
    if (openLoginModal) {
        body?.classList.add("overflow-hidden");
    } else {
        body?.classList.remove("overflow-hidden");
    }
    return (
        <>
            <header className="z-50 top-0 left-1/2 right-0 -translate-x-1/2 fixed w-full bg-neutral-800/80 backdrop-blur">
                <div className="w-full max-w-[1800px] mx-auto px-4 md:px-10 3xl:px-2 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Logo width={150} height={50} />
                    </div>
                    {status === "authenticated" && !isDataEmptyorUndefined(session) ? (
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Hi, {session?.user?.name?.split(" ")[0] || "user"}</p>
                            {session?.user?.image && (
                                <Image
                                    src={session.user.image as string}
                                    alt="profile-image"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                ></Image>
                            )}
                            <Button
                                variant="secondary"
                                className="bg-neutral-100 font-semibold hover:bg-neutral-100/80 hover:scale-105"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="secondary"
                            className="bg-primary font-semibold hover:bg-primary/80 hover:scale-105"
                            onClick={handleLoginModal}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </header>
            {openLoginModal && <LoginModal closeLoginModal={handleLoginModal} />}
        </>
    );
};

export default Header;
