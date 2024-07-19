"use client";
import { useState } from "react";
import Image from "next/image";
import { animeData } from "./TrendingAnimeList";
import { DotFilledIcon } from "@radix-ui/react-icons";
import HoverCard from "./HoverCard";

const FeaturedAnimeCard = ({ anime }: { anime: animeData }) => {
    const [showHoverCard, setShowHoverCard] = useState(false);
    const handleOpenHover = () => {
        setShowHoverCard(true);
    };
    const handleCloseHover = () => {
        setShowHoverCard(false);
    };

    return (
        <div
            key={anime.mal_id}
            className="flex items-center gap-4 py-4 border-b border-white border-opacity-15"
        >
            <div className="relative h-auto">
                <Image
                    src={anime.images.webp.large_image_url}
                    alt={anime.title_english || anime.title}
                    width={70}
                    height={96}
                    className="w-20 h-28 rounded-md object-cover"
                    onMouseOverCapture={handleOpenHover}
                    onMouseLeave={handleCloseHover}
                />
                {showHoverCard && <HoverCard anime={anime} handleOpenHover={handleOpenHover} handleCloseHover={handleCloseHover} />}
            </div>

            <div className="text-sm w-[calc(100%-96px)]">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold">
                    {anime.title_english || anime.title}
                </p>
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
    );
};

export default FeaturedAnimeCard;
