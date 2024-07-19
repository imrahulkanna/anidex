"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animeData } from "./TrendingAnimeList";
import { DotFilledIcon } from "@radix-ui/react-icons";
import HoverCardWrapper from "./HoverCardWrapper";
import HoverCard from "./HoverCard";

const FeaturedAnimeCard = ({ anime }: { anime: animeData }) => {
    // const [showHoverCard, setShowHoverCard] = useState(false);
    // const [cardPosition, setCardPosition] = useState("bottom");
    // const imageRef = useRef<HTMLDivElement | null>(null);
    // const cardRef = useRef<HTMLDivElement | null>(null);

    // useEffect(() => {
    //     if (showHoverCard && imageRef.current && cardRef.current) {
    //         const imageRect = imageRef.current.getBoundingClientRect();
    //         const cardRect = cardRef.current.getBoundingClientRect();
    //         const spaceBelow = window.innerHeight - imageRect.bottom;
    //         let ans;
    //         if (spaceBelow < cardRect.height) {
    //             setCardPosition("top");
    //             ans = 'top'
    //         } else {
    //             setCardPosition("bottom");
    //             ans = 'bottom'
    //         }
    //     }
    // }, [showHoverCard]);

    // const handleOpenHover = useCallback(() => {
    //     setShowHoverCard(true);
    // },[]);
    // const handleCloseHover = useCallback(() => {
    //     setShowHoverCard(false);
    // }, []);

    return (
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
                {/* <div ref={imageRef} onMouseEnter={handleOpenHover} onMouseLeave={handleCloseHover}>
                    <Image
                            src={anime.images.webp.large_image_url}
                            alt={anime.title_english || anime.title}
                            width={70}
                            height={96}
                            className="w-20 h-28 rounded-md object-cover"
                        />
                </div>
                {showHoverCard && (
                    <HoverCard
                        anime={anime}
                        handleOpenHover={handleOpenHover}
                        handleCloseHover={handleCloseHover}
                        ref={cardRef}
                        cardPosition = {cardPosition}
                    />
                )} */}
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
