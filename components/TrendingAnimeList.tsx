import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { getTrendingAnimes } from "../app/lib/fetch";
import TrendingAnimeCard from "./TrendingAnimeCard";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { DAY } from "@/app/lib/constants";
import { animeData } from "@/types/ApiResponse";
import { apiCallHandler } from "@/app/lib/server-utils";

const TrendingAnimeList = async () => {
    // const trendingAnimeData: Array<animeData> = await getTrendingAnimes();
    const trendingAnimeData: Array<animeData> =
        (await apiCallHandler(getTrendingAnimes, "TRENDINGANIMES", 3 * DAY)) || [];

    return (
        <div id="trending-animes" className="mb-10">
            <h3 className="font-bold text-2xl md:mx-4">Trending</h3>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-[95%] mx-auto"
            >
                <CarouselContent>
                    {!isDataEmptyorUndefined(trendingAnimeData) &&
                        trendingAnimeData.map((anime: animeData, index: number) => (
                            <TrendingAnimeCard anime={anime} index={index} key={anime.mal_id} />
                        ))}
                </CarouselContent>
                <CarouselPrevious variant="secondary" className="h-1/4 hover:bg-primary" />
                <CarouselNext variant="secondary" className="h-1/4 hover:bg-primary font-bold" />
            </Carousel>
        </div>
    );
};

export default TrendingAnimeList;
