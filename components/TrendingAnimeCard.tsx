import React from "react";
import { CarouselItem } from "./ui/carousel";
import NumberSVG from "./NumberSVG";
import Image from "next/image";
import { animeData } from "./TrendingAnimeList";

const TrendingAnimeCard = ({ anime, index }: { anime: animeData; index: number }) => {
    return (
        <CarouselItem
            className={`md:basis-1/2 md:w-[50%] lg:basis-1/4 lg:w-[25%] xl:basis-1/5 xl:w-[20%] 2xl:basis-1/6 2xl:w-[16.66%] ${
                index === 0 && "-ml-5"
            }`}
        >
            <div className="flex items-center justify-center relative w-full h-[190px] cursor-pointer">
                <NumberSVG
                    rank={index + 1}
                    className="absolute top-0 left-0 bottom-0 right-auto w-1/2"
                    title={anime.title_english || anime.title}
                />
                <div>
                    <Image
                        src={anime.images.webp.large_image_url}
                        alt={anime.title_english || anime.title}
                        width={180}
                        height={0}
                        title={anime.title_english || anime.title}
                        className="absolute top-0 right-0 bottom-0 left-auto w-1/2 h-[190px]"
                    />
                </div>
            </div>
        </CarouselItem>
    );
};

export default TrendingAnimeCard;
