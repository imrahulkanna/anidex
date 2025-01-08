"use client";
import { useUserData } from "@/context/UserDataContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    const { userData } = useUserData();
    const currentPage = usePathname().split("/")[2];
    const navMenu = ["Profile", "Wishlist", "Favourites"];

    return (
        <div className="flex flex-col justify-center items-center bg-white/10 px-5 relative mb-10">
            <div
                className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full backdrop-blur-xl opacity-30 bg-center"
                style={{ backgroundImage: `url(${userData?.image})` }}
            ></div>
            <h2 className="z-30 text-4xl font-semibold py-10">Hi, {userData?.name}</h2>
            <div className="z-30 w-full flex items-center justify-evenly font-medium">
                {navMenu.map((item) => (
                    <Link
                        href={`/user/${item.toLocaleLowerCase()}`}
                        className={`px-4 pb-3${
                            currentPage === item.toLocaleLowerCase()
                                ? " border-b-2 border-primary"
                                : ""
                        }`}
                        key={item}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
