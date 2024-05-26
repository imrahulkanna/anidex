import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const Header = ({ rowdies }: { rowdies: any}) => {
    return (
        <header className="z-50 top-0 left-1/2 right-0 -translate-x-1/2 fixed w-full bg-neutral-800/80 backdrop-blur">
            <div className="w-full max-w-[1800px] mx-auto px-4 md:px-10 3xl:px-2 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Image src="/anidex-logo.png" alt="anidex logo" width={50} height={50} />
                    <p className={`text-4xl font-extrabold text-primary ${rowdies.className}`}>
                        AniDex
                    </p>
                </div>
                <Button variant="secondary" className="bg-primary font-semibold">
                    Login
                </Button>
            </div>
        </header>
    );
};

export default Header;
