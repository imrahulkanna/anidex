"use client";
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import HoverCard from "./HoverCard";
import {animeData} from "@/types/ApiResponse";
import Link from "next/link";

interface props {
    children: ReactNode;
    anime: animeData | undefined;
}

const HoverCardWrapper = ({ children, anime }: props) => {
    const [showHoverCard, setShowHoverCard] = useState(false);
    const [cardPosition, setCardPosition] = useState("bottom");
    const [isDesktopSize, setIsDesktopSize] = useState(true);
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

    // displaying hover cards only for desktop screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) handleCloseHover();
            setIsDesktopSize(window.innerWidth >= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleOpenHover = useCallback(() => {
        isDesktopSize && setShowHoverCard(true);
    }, [isDesktopSize]);

    const handleCloseHover = useCallback(() => {
        setShowHoverCard(false);
    }, []);

    return (
        <>
            <div ref={imageRef} onMouseEnter={handleOpenHover} onMouseLeave={handleCloseHover}>
                <Link href={`/anime/${anime?.mal_id}`}>{children}</Link>
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
