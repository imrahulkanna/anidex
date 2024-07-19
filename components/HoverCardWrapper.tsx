"use client"
import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import HoverCard from "./HoverCard";
import { animeData } from "./TrendingAnimeList";

interface props {
    children: ReactNode;
    anime: animeData;
}

const HoverCardWrapper = ({ children, anime }: props) => {
    const [showHoverCard, setShowHoverCard] = useState(false);
    const [cardPosition, setCardPosition] = useState("bottom");
    const imageRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (showHoverCard && imageRef.current && cardRef.current) {
            const imageRect = imageRef.current.getBoundingClientRect();
            const cardRect = cardRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - imageRect.bottom;
            if (spaceBelow < cardRect.height) {
                setCardPosition("top");
            } else {
                setCardPosition("bottom");
            }
        }
    }, [showHoverCard]);

    const handleOpenHover = useCallback(() => {
        setShowHoverCard(true);
    }, []);
    const handleCloseHover = useCallback(() => {
        setShowHoverCard(false);
    }, []);
    return (
        <>
            <div ref={imageRef} onMouseEnter={handleOpenHover} onMouseLeave={handleCloseHover}>
                {children}
            </div>
            {showHoverCard && (
                <HoverCard
                    anime={anime}
                    handleOpenHover={handleOpenHover}
                    handleCloseHover={handleCloseHover}
                    ref={cardRef}
                    cardPosition={cardPosition}
                />
            )}
        </>
    );
};

export default HoverCardWrapper;
