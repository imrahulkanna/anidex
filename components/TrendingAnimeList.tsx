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
import { apiCallHandler } from "@/app/lib/utils";

export interface imageType {
    image_url: string;
    large_image_url: string;
}

export interface animeData {
    mal_id: string | null;
    title_english: string | null;
    title: string;
    images: {
        webp: imageType;
        jpg?: imageType;
    };
    type: string;
    episodes: number;
    aired: {
        from: string | null;
    };
    duration?: string;
    broadcast: {
        time: string;
    };
}

const TrendingAnimeList = async () => {
    // const trendingAnimeData: Array<animeData> = await getTrendingAnimes();
    const trendingAnimeData: Array<animeData> = await apiCallHandler(getTrendingAnimes);
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
