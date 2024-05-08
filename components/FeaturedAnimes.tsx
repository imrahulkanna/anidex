import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    getTopAiringAnimes,
    getMostPopularAnimes,
    getMostFavoriteAnimes,
    getLatestCompletedAnimes,
} from "@/app/lib/fetch";
import { animeData } from "./TrendingAnimeList";
import { DotFilledIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { isDataEmptyorUndefined } from "@/app/lib/utils";

export interface categoryListType {
    title: string;
}

const FeaturedAnimes = async ({ title }: categoryListType) => {
    let data: Array<animeData> | null;

    switch (title) {
        case "Top Airing":
            data = await getTopAiringAnimes();
            break;

        case "Most Popular":
            data = await getMostPopularAnimes();
            break;

        case "Most Favorite":
            data = await getMostFavoriteAnimes();
            break;

        case "Latest Completed":
            data = await getLatestCompletedAnimes();
            break;

        default:
            data = null;
            break;
    }
    return (
        <div
            className="w-full md:w-1/2 xl:w-1/4 md:px-2"
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
                            <Image
                                src={anime.images.webp.large_image_url}
                                alt={anime.title_english || anime.title}
                                width={70}
                                height={96}
                                className="w-20 h-28 rounded-md object-cover"
                            />

                            <div className="text-sm w-[calc(100%-96px)]">
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold">
                                    {anime.title_english || anime.title}
                                </p>
                                <div className="flex items-center gap-1">
                                    <div className="opacity-60">
                                        {anime.episodes ? (
                                            <p className="font-medium">{anime.episodes} eps</p>
                                        ) : (
                                            <span>? eps</span>
                                        )}
                                    </div>
                                    <DotFilledIcon className="opacity-30" />
                                    <div className="opacity-60 font-medium">{anime.type}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="py-4">
                    <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                        View more <ChevronRightIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedAnimes;
