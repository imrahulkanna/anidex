import React, { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import { getAnimesBySearch } from "@/app/lib/fetch";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { animeData } from "@/types/ApiResponse";
import { DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const DisplaySearchAnimeResults = ({ data }: { data: animeData[] | [] }) => {
    return (
        <ul className="absolute w-full top-[102%] bg-neutral-700 shadow-[5px_20px_20px_rgba(0,0,0,0.6)] text-xs text-white font-semibold rounded">
            {isDataEmptyorUndefined(data) ? (
                <li className="p-3">No results found</li>
            ) : (
                data.slice(0, 5).map((anime: animeData) => (
                    <li
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
                        <div className="w-full flex flex-col justify-around">
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
                    </li>
                ))
            )}
        </ul>
    );
};

const SearchBox = () => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [searchData, setSearchData] = useState<animeData[] | []>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const previousController = useRef<AbortController | null>(null);

    useEffect(() => {
        if (searchKey.length < 2) {
            setShowDropdown(false);
        }

        const getSearchResults = setTimeout(async () => {
            if (searchKey.length >= 2) {
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
        }, 500);

        return () => clearTimeout(getSearchResults);
    }, [searchKey]);

    const handleInputChange = (name: string, value: string) => {
        setSearchKey(value);
    };

    return (
        <div className="w-[300px] relative">
            <InputBox
                type="text"
                placeholder="Search anime ..."
                inputValue={searchKey}
                onInputChange={handleInputChange}
                name="search-box"
                readOnly={false}
                colorStyling="bg-neutral-200 text-neutral-900 placeholder-neutral-600 font-medium"
            >
                <MagnifyingGlassIcon
                    width={18}
                    height={18}
                    stroke="black"
                    strokeWidth={2}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                />
            </InputBox>
            {showDropdown && <DisplaySearchAnimeResults data={searchData} />}
        </div>
    );
};

export default SearchBox;
