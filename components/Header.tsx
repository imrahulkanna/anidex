"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import LoginModal from "./LoginModal";
import { signOut, useSession } from "next-auth/react";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import Logo from "./Logo";
import { useLoading } from "@/context/LoadingContext";
import { TriangleDownIcon, PersonIcon, ExitIcon } from "@radix-ui/react-icons";

const Header = ({ rowdies }: { rowdies: any }) => {
    const { setLoading } = useLoading();
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const body = document.querySelector("body");
        if (openLoginModal) {
            body?.classList.add("overflow-hidden");
        } else {
            body?.classList.remove("overflow-hidden");
        }
    }, [openLoginModal]);

    useEffect(() => {
        setLoading(false);
    }, [session]);

    const handleLoginModal = () => {
        setOpenLoginModal(!openLoginModal);
        if (openLoginModal) {
            setLoading(false);
        }
    };

    const handleOpenMenu = (
        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        setOpenMenu(!openMenu);
    };

    const MenuDropdown = () => {
        const dropdownList = ["Profile", "Sign out"];

        const handleItemClick = (item: string) => {
            switch (item) {
                case "Profile":
                    break;
                case "Sign out":
                    setLoading(true);
                    signOut();
                    break;
                default:
                    break;
            }
        };

        const Icon = ({ item }: { item: string }) => {
            switch (item) {
                case "Profile":
                    return (
                        <PersonIcon
                            style={{
                                width: "20px",
                                height: "20px",
                                border: "1px solid gray",
                                borderRadius: "100%",
                                paddingTop: "2px",
                            }}
                        />
                    );
                case "Sign out":
                    return <ExitIcon style={{ width: "20px", height: "20px" }} />;
                default:
                    return <></>;
            }
        };
        return (
            <ul className="absolute top-[120%] w-[170%] right-0 flex flex-col gap-1 bg-neutral-800 border-neutral-700 border text-neutral-400 text-sm p-[6px] font-medium rounded-xl text-left">
                {dropdownList.map((item) => (
                    <li
                        className="py-2 px-4 rounded-md flex items-center gap-2 hover:bg-neutral-700 hover:text-neutral-50"
                        onClick={() => handleItemClick(item)}
                        key={item}
                    >
                        <Icon item={item} />
                        {item}
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <>
            <header className="z-50 top-0 left-1/2 right-0 -translate-x-1/2 fixed w-full bg-obsidian/75 backdrop-blur">
                <div className="w-full max-w-[1800px] mx-auto px-4 md:px-10 3xl:px-2 py-4 flex justify-between items-center max-h-20">
                    <div>
                        <Logo width={150} height={50} />
                    </div>
                    {status === "authenticated" && !isDataEmptyorUndefined(session) ? (
                        <button
                            className="flex items-center gap-1 border-neutral-700 border pl-4 pr-2 py-[6px] rounded-full transition-all hover:border-neutral-600 hover:shadow-[#525252_0px_0px_0px_2px] relative"
                            onClick={handleOpenMenu}
                        >
                            {session?.user?.image && (
                                <Image
                                    src={session.user.image as string}
                                    alt="profile-image"
                                    width={35}
                                    height={35}
                                    className="rounded-full"
                                ></Image>
                            )}
                            <p className="font-semibold flex items-center gap-[6px] text-neutral-200">
                                {session?.user?.name?.split(" ")[0] || session?.user?.username}
                                <TriangleDownIcon
                                    style={{
                                        color: "rgb(136, 147, 151)",
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                            </p>
                            {openMenu && <MenuDropdown />}
                        </button>
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
