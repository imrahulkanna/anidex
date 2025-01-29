"use client";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import HoverCardWrapper from "@/components/HoverCardWrapper";
import { animeData } from "@/components/TrendingAnimeList";
import { useLoading } from "@/context/LoadingContext";
import { useUserData } from "@/context/UserDataContext";
import { DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Watchlist = () => {
    const { userData } = useUserData();
    const { isLoading, setLoading } = useLoading();
    const [watchlist, setWatchlistData] = useState([]);

    useEffect(() => {
        if (!userData?._id) {
            setLoading(true);
            return;
        }

        const fetchWatchlistData = async () => {
            const response = await fetch(`/api/get-watchlist-details/${userData._id}`, {
                method: "GET",
                cache: "no-cache",
            });
            const data = await response.json();
            console.log("data", data);

            setWatchlistData(data.data);
        };

        fetchWatchlistData();
    }, [userData]);

    useEffect(() => {
        !isDataEmptyorUndefined(watchlist) && setLoading(false);
    }, [watchlist]);

    if (isLoading) {
        return <></>;
    }

    return (
        <div className="mx-auto lg:w-3/4">
            <div className="flex flex-wrap justify-center [&>*:nth-child(odd)]:px-2 [&>*:nth-child(even)]:px-2 md:[&>*:nth-child(odd)]:px-4 md:[&>*:nth-child(even)]:px-4">
                {!isDataEmptyorUndefined(watchlist) &&
                    watchlist?.map((anime: animeData) => (
                        <div key={anime.mal_id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
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
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold hover:text-primary">
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
                    ))}
            </div>
        </div>
    );
};

export default Watchlist;
