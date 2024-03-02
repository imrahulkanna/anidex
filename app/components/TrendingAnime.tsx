import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getTrendingAnimes } from "../lib/fetch";
import NumberSVG from "./NumberSVG";

interface imageType {
    image_url: string;
}

export interface animeData {
    mal_id: string | null;
    title_english: string;
    images: {
        webp: imageType;
        jpg?: imageType;
    };
}

const TrendingAnime = async () => {
    const trendingAnimeData: Array<animeData> = await getTrendingAnimes();
    return (
        <div className="mt-10">
            {/* <h1 className="font-bold text-2xl">Trending</h1>
            <div className="overflow-hidden">
                <div className="flex flex-wrap gap-5">
                    {trendingAnimeData.map((anime: animeData, index: number) => (
                        <div
                            key={anime.mal_id}
                            className="flex w-[300px] h-56 relative cursor-pointe shrink-0 grow-0 basis-fullr"
                        >
                            <NumberSVG rank={index + 1} classes="absolute top-0 bottom-0 left-0 right-auto w-1/2"/>
                            <div>
                                <Image
                                    src={anime.images.webp.image_url}
                                    alt={`${anime.title_english}`}
                                    width={150}
                                    height={150}
                                    className="absolute top-0 bottom-0 right-0 left-auto h-56 object-cover w-1/2"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-[92%] mx-auto"
            >
                <CarouselContent>
                    {trendingAnimeData.map((anime: animeData, index: number) => (
                        <CarouselItem
                            key={anime.mal_id}
                            className={`md:basis-1/3 lg:basis-1/5 xl:1/6 ${
                                index === 0 && "-ml-10"
                            }`}
                        >
                            <div className="flex items-center justify-center relative h-[180px]">
                                <NumberSVG
                                    rank={index + 1}
                                    className="absolute top-0 left-0 bottom-0 right-auto w-1/2"
                                />
                                <div>
                                    <Image
                                        src={anime.images.webp.image_url}
                                        alt={`${anime.title_english}`}
                                        width={120}
                                        height={0}
                                        className="absolute top-0 right-0 bottom-0 left-auto w-1/2 h-[180px]"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default TrendingAnime;
{
    /* <h2 className="[writing-mode:vertical-lr] rotate-180">
                            {anime.title_english}
                        </h2>
                        className="absolute top-0 left-0 z-0" */
}
