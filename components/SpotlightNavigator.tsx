"use client";
import { animeData } from "@/types/ApiResponse";
import React, { useEffect, useRef, useState } from "react";

interface componentProps {
    animeData: animeData[];
}

const SpotlightNavigator = ({ animeData }: componentProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        startSlideShow(currentSlide);

        return () => stopSlideShow();
    }, [currentSlide]);

    const startSlideShow = (selectedIndex: number) => {
        stopSlideShow();
        setCurrentSlide(selectedIndex);

        const slides = document.getElementsByClassName("slide");
        for (let index = 0; index < animeData.length; index++) {
            (slides[index] as HTMLElement).style.display = "none";
        }
        (slides[selectedIndex] as HTMLElement).style.display = "flex";

        const dots = document.getElementsByClassName("dot");
        for (let index = 0; index < animeData.length; index++) {
            dots[index].className = dots[index].className.replace(" active", "");
        }
        dots[selectedIndex].className += " active";

        timeoutRef.current = setTimeout(
            () => startSlideShow((selectedIndex + 1) % animeData.length),
            5000
        );
    };

    const stopSlideShow = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    return (
        <div className="w-full text-center absolute bottom-10 mx-auto">
            <div className="inline-flex items-center justify-center py-2 px-4 rounded-3xl bg-black/15 backdrop-blur-lg">
                {animeData.map((_, index) => (
                    <span
                        key={index}
                        className="dot hover:bg-obsidian/60"
                        onClick={() => startSlideShow(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default SpotlightNavigator;
