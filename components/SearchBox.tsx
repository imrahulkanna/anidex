import React, { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import { getAnimesBySearch } from "@/app/lib/fetch";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { animeData } from "@/types/ApiResponse";
import { DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SeachAnimePropTypes {
    data: animeData[] | [] | null;
    showLoader: boolean;
}

const DisplaySearchAnimeResults = ({ data, showLoader }: SeachAnimePropTypes) => {
    return (
        <div className="absolute w-full top-[102%] bg-neutral-700 shadow-[5px_20px_20px_rgba(0,0,0,0.6)] text-xs text-white font-semibold rounded">
            {showLoader && (
                <div className="w-full flex items-center justify-center p-3 gap-5">
                    <span className="rounded-[100%] w-4 h-4 border bg-neutral-50 animate-loader-bounce "></span>
                    <span className="rounded-[100%] w-4 h-4 border bg-neutral-50 animate-loader-bounce delay-100"></span>
                    <span className="rounded-[100%] w-4 h-4 border bg-neutral-50 animate-loader-bounce delay-200"></span>
                </div>
            )}
            {data !== null && (
                <div>
                    {data.length === 0 ? (
                        <div className="p-3">No results found</div>
                    ) : (
                        data.slice(0, 5).map((anime: animeData) => (
                            <Link
                                href=""
                                key={anime.mal_id}
                                className="w-full flex p-3 gap-2 border-b border-white/20 last:border-none hover:bg-white/10 group"
                            >
                                <Image
                                    src={anime.images.webp.large_image_url}
                                    alt={anime.title_english || anime.title}
                                    width={50}
                                    height={70}
                                    title={anime.title_english || anime.title}
                                    className="object-none rounded"
                                />
                                <div className="w-full flex flex-col justify-around h-[70.7px]">
                                    <p className="whitespace-nowrap overflow-hidden text-ellipsis text-sm w-[218px] group-hover:text-primary">
                                        {anime.title_english || anime.title}
                                    </p>
                                    <p>{anime.type}</p>
                                    <div className="flex gap-0.5 items-center">
                                        <p>{anime.aired.string.split(" to")[0]}</p>
                                        <DotFilledIcon className="opacity-30" />
                                        <p>{anime.duration}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

const SearchBox = () => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [searchData, setSearchData] = useState<animeData[] | [] | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const previousController = useRef<AbortController | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (searchKey.length < 2) {
            setSearchData(null);
            setShowLoader(false);
            setShowDropdown(false);
        }

        const getSearchResults = setTimeout(async () => {
            if (searchKey.length >= 2) {
                setShowLoader(true);
                if (previousController.current) {
                    previousController.current.abort();
                }

                const controller = new AbortController();
                previousController.current = controller;
                const signal = controller.signal;

                const data = await getAnimesBySearch(searchKey, signal);
                console.log("searchData", data);

                setSearchData(data);
                setShowDropdown(true);
            }
            setShowLoader(false);
        }, 500);

        return () => clearTimeout(getSearchResults);
    }, [searchKey]);

    const handleInputChange = (name: string, value: string) => {
        setSearchKey(value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-[300px] relative" ref={dropdownRef}>
            <InputBox
                type="text"
                placeholder="Search anime ..."
                inputValue={searchKey}
                onInputChange={handleInputChange}
                name="search-box"
                readOnly={false}
                colorStyling="bg-neutral-200 text-neutral-900 placeholder-neutral-600 font-medium"
                onFocus={() => setShowDropdown(true)}
            >
                <MagnifyingGlassIcon
                    width={18}
                    height={18}
                    stroke="black"
                    strokeWidth={2}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                />
            </InputBox>
            {(showDropdown || showLoader) && (
                <DisplaySearchAnimeResults data={searchData} showLoader={showLoader} />
            )}
        </div>
    );
};

export default SearchBox;
