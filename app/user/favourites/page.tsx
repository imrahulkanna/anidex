"use client";
import {isDataEmptyorUndefined} from "@/app/lib/utils";
import {useUserData} from "@/context/UserDataContext";
import React, {useEffect, useState} from "react";
import {WatchlistAnimesSkeleton} from "@/components/WatchlistAnimesSkeleton";
import {animeData} from "@/types/ApiResponse";
import HoverCardWrapper from "@/components/HoverCardWrapper";
import Image from "next/image";
import Link from "next/link";
import {DotFilledIcon} from "@radix-ui/react-icons";

const Favourites = () => {
    const { userData } = useUserData();
    const [favouriteAnimes, setFavouriteAnimes] = useState([]);

    useEffect(() => {
        if (!userData?._id) {
            return;
        }

        const fetchFavouriteAnimesData = async () => {
            const response = await fetch(`/api/get-favourites-details/${userData._id}`, {
                method: "GET",
                cache: "no-cache",
            });
            const data = await response.json();

            setFavouriteAnimes(data.data);
        };

        fetchFavouriteAnimesData();
    }, [userData]);

    return (
        <div className="mx-auto lg:w-3/4">
            {isDataEmptyorUndefined(userData) || isDataEmptyorUndefined(favouriteAnimes) ? (
                <WatchlistAnimesSkeleton />
            ) : (
                <div className="flex flex-wrap justify-center [&>*:nth-child(odd)]:px-2 [&>*:nth-child(even)]:px-2 md:[&>*:nth-child(odd)]:px-4 md:[&>*:nth-child(even)]:px-4">
                    {favouriteAnimes.map((anime: animeData) => (
                        <div key={anime.mal_id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 group">
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
                            <Link href={`/anime/${anime.mal_id}`}>
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold group-hover:text-primary">
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
            )}
        </div>
    );
};

export default Favourites;
