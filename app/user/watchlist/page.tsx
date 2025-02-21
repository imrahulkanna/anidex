"use client";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import HoverCardWrapper from "@/components/HoverCardWrapper";
import { animeData } from "@/types/ApiResponse";
import { WatchlistAnimesSkeletion } from "@/components/WatchlistAnimesSkeletion";
import { useLoading } from "@/context/LoadingContext";
import { useUserData } from "@/context/UserDataContext";
import { DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type WatchlistOption = "All" | "Watching" | "On-Hold" | "Plan to watch" | "Dropped" | "Completed";

interface watchlistAnimeProps {
    selectedOption: WatchlistOption;
    watchlistData: { [key: string]: animeData };
    userWatchlist: { [key: string]: number[] };
}

const DisplayAnime = ({ anime }: { anime: animeData }) => {
    return (
        <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
            <div className="my-4 relative">
                <HoverCardWrapper anime={anime}>
                    <Image
                        src={anime.images.webp.large_image_url}
                        alt={anime.title_english || anime.title}
                        width={300}
                        height={0}
                        className="w-full h-[250px] md:h-[300px] xl:h-[250px] 2xl:h-[320px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-30%" />
                </HoverCardWrapper>
            </div>
            <Link href="#">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold">
                    {anime.title_english || anime.title}
                </p>
            </Link>
            <div className="flex items-center gap-0.5 text-sm">
                <div className="opacity-60 font-medium">{anime.type || "TV"}</div>
                <DotFilledIcon className={`opacity-30`} />
                <div className="opacity-60">
                    {anime.episodes ? (
                        <span className={`font-medium`}>{anime.episodes} eps</span>
                    ) : (
                        <span>N/A</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const WatchlistAnimes = ({
    selectedOption = "All",
    watchlistData,
    userWatchlist,
}: watchlistAnimeProps) => {
    const animeIdArr =
        selectedOption === "All"
            ? Object.values(userWatchlist).reduce((acc: number[], arr: number[]) => {
                    acc = [...acc, ...arr];
                    return acc;
                }, [] as number[])
            : userWatchlist[selectedOption];
    return (
        <div className="flex flex-wrap justify-center [&>*:nth-child(odd)]:px-2 [&>*:nth-child(even)]:px-2 md:[&>*:nth-child(odd)]:px-4 md:[&>*:nth-child(even)]:px-4">
            {animeIdArr.map((animeId) => (
                <DisplayAnime key={watchlistData[animeId].mal_id} anime={watchlistData[animeId]} />
            ))}
        </div>
    );
};

const Watchlist = () => {
    const { userData } = useUserData();
    const { isLoading, setLoading } = useLoading();

    const defaultOptions = {
        All: { selected: true },
        Watching: { selected: false },
        "On-Hold": { selected: false },
        "Plan to watch": { selected: false },
        Dropped: { selected: false },
        Completed: { selected: false },
    };
    const [watchlist, setWatchlistData] = useState<{ [key: string]: animeData }>({});
    const [options, setOptions] = useState(defaultOptions);

    useEffect(() => {
        if (!userData?._id) {
            return;
        }

        const fetchWatchlistData = async () => {
            const response = await fetch(`/api/get-watchlist-details/${userData._id}`, {
                method: "GET",
                cache: "no-cache",
            });
            const data = await response.json();

            setWatchlistData(data.data);
        };

        fetchWatchlistData();
    }, [userData]);

    useEffect(() => {
        !isDataEmptyorUndefined(watchlist) && setLoading(false);
    }, [watchlist]);

    const handleOptionClick = (optionName: WatchlistOption) => {
        if (options[optionName].selected) return;

        setOptions({
            ...defaultOptions,
            All: { selected: false },
            [optionName]: { selected: true },
        });
    };

    return (
        <div className="mx-auto lg:w-3/4">
            <div className="w-full flex gap-x-2 md:gap-x-4 gap-y-2 justify-center flex-wrap px-2 md:px-4">
                {Object.entries(options).map(([name, option]) => (
                    <div
                        key={name}
                        className={`px-6 py-2 cursor-pointer rounded-md font-semibold text-xs md:text-sm ${
                            option.selected
                                ? "bg-primary text-neutral-800"
                                : "bg-white/10 hover:text-primary"
                        }`}
                        onClick={() => handleOptionClick(name as WatchlistOption)}
                    >
                        {name}
                    </div>
                ))}
            </div>
            {isDataEmptyorUndefined(userData) || isDataEmptyorUndefined(watchlist) ? (
                <WatchlistAnimesSkeletion />
            ) : (
                <WatchlistAnimes
                    selectedOption={
                        Object.entries(options).find(
                            ([name, option]) => option.selected
                        )?.[0] as unknown as WatchlistOption
                    }
                    watchlistData={watchlist}
                    userWatchlist={userData?.watchlist}
                />
            )}
        </div>
    );
};

export default Watchlist;
