import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { getTrendingAnimes } from "../app/lib/fetch";
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
        <div className="">
            <h1 className="font-bold text-2xl">Trending</h1>
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
                            className={`md:basis-1/3 md:w-[33.33%] lg:basis-1/4 lg:w-[25%] xl:basis-1/5 xl:w-[20%] 2xl:basis-1/6 2xl:w-[16.66%] ${
                                index === 0 && "-ml-5"
                            }`}
                        >
                            <div className="flex items-center justify-center relative w-full h-[190px]">
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
                                        className="absolute top-0 right-0 bottom-0 left-auto w-1/2 h-[190px]"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant="secondary" className="h-1/4 hover:bg-primary" />
                <CarouselNext variant="secondary" className="h-1/4 hover:bg-primary font-bold" />
            </Carousel>
        </div>
    );
};

export default TrendingAnime;
