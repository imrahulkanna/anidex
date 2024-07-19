import React from "react";
import Link from "next/link";
import {
    getTopAiringAnimes,
    getMostPopularAnimes,
    getMostFavoriteAnimes,
    getLatestCompletedAnimes,
} from "@/app/lib/fetch";
import { animeData } from "./TrendingAnimeList";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { apiCallHandler } from "@/app/lib/utils";
import FeaturedAnimeCard from "./FeaturedAnimeCard";

export interface categoryListType {
    title: string;
}

const FeaturedAnimes = async ({ title }: categoryListType) => {
    let data: Array<animeData> | null;

    switch (title) {
        case "Top Airing":
            // data = await getTopAiringAnimes();
            data = await apiCallHandler(getTopAiringAnimes);
            break;

        case "Most Popular":
            // data = await getMostPopularAnimes();
            data = await apiCallHandler(getMostPopularAnimes);
            break;

        case "Most Favorite":
            // data = await getMostFavoriteAnimes();
            data = await apiCallHandler(getMostFavoriteAnimes);
            break;

        case "Latest Completed":
            // data = await getLatestCompletedAnimes();
            data = await apiCallHandler(getLatestCompletedAnimes);
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
                        <FeaturedAnimeCard anime={anime} />
                    ))}
                <div className="pt-4">
                    <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                        View more <ChevronRightIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedAnimes;
