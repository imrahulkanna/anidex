import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    getLatestCompletedAnimes,
    getMostFavoriteAnimes,
    getMostPopularAnimes,
    getTopAiringAnimes,
} from "@/app/lib/fetch";
import {animeData} from "@/types/ApiResponse";
import {ChevronRightIcon, DotFilledIcon} from "@radix-ui/react-icons";
import {isDataEmptyorUndefined} from "@/app/lib/utils";
import {apiCallHandler} from "@/app/lib/server-utils";
import HoverCardWrapper from "./HoverCardWrapper";
import {DAY, HOUR} from "@/app/lib/constants";

export interface categoryListType {
    title: string;
}

const FeaturedAnimes = async ({ title }: categoryListType) => {
    let data: Array<animeData> | null;

    switch (title) {
        case "Top Airing":
            // data = await getTopAiringAnimes();
            data = (await apiCallHandler(getTopAiringAnimes, "TOPAIRINGANIMES", 3 * DAY)) || [];
            break;

        case "Most Popular":
            // data = await getMostPopularAnimes();
            data = (await apiCallHandler(getMostPopularAnimes, "MOSTPOPULARANIMES", 2 * DAY)) || [];
            break;

        case "Most Favorite":
            // data = await getMostFavoriteAnimes();
            data =
                (await apiCallHandler(getMostFavoriteAnimes, "MOSTFAVORITEANIMES", 2 * DAY)) || [];
            break;

        case "Latest Completed":
            // data = await getLatestCompletedAnimes();
            data =
                (await apiCallHandler(
                    getLatestCompletedAnimes,
                    "LATESTCOMPLETEDANIMES",
                    1 * HOUR
                )) || [];
            break;

        default:
            data = null;
            break;
    }
    return (
        <div
            className="w-full md:w-1/2 xl:w-1/4 md:px-4"
            id={title.toLowerCase().split(" ").join("-")}
        >
            <h3 className="font-bold text-2xl">{title}</h3>
            <div>
                {!isDataEmptyorUndefined(data) &&
                    data?.slice(0, 5).map((anime: animeData) => (
                        <div
                            key={anime.mal_id}
                            className="flex items-center gap-4 py-4 border-b border-white border-opacity-15"
                        >
                            <div className="relative h-auto">
                                <HoverCardWrapper anime={anime}>
                                    <Image
                                        src={anime.images.webp.large_image_url}
                                        alt={anime.title_english || anime.title}
                                        width={70}
                                        height={96}
                                        className="w-20 h-28 rounded-md object-cover"
                                    />
                                </HoverCardWrapper>
                            </div>
                            <div className="text-sm w-[calc(100%-96px)]">
                                <Link href={`/anime/${anime.mal_id}`}>
                                    <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold hover:text-primary">
                                        {anime.title_english || anime.title}
                                    </p>
                                </Link>
                                <div className="flex items-center gap-1">
                                    <div className="opacity-60">
                                        {anime.episodes ? (
                                            <p className="font-medium">{anime.episodes} eps</p>
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </div>
                                    <DotFilledIcon className="opacity-30" />
                                    <div className="opacity-60 font-medium">{anime.type}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="pt-4 flex">
                    <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                        View more <ChevronRightIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedAnimes;
