"use client";
import { animeData } from "@/types/ApiResponse";
import React, { useEffect } from "react";

interface componentProps {
    animeData: animeData[];
}

const SpotlightNavigator = ({ animeData }: componentProps) => {
    useEffect(() => {
        handleSlideChange(0);
    }, [animeData]);

    const handleSlideChange = (selectedIndex: number) => {
        const dots = document.getElementsByClassName("dot");
        for (let index = 0; index < animeData.length; index++) {
            dots[index].className = dots[index].className.replace(" active", "");
        }
        dots[selectedIndex].className += " active";
    };
    return (
        <div className="w-full text-center absolute bottom-10 mx-auto">
            <div className="inline-flex items-center justify-center py-2 px-4 rounded-3xl bg-black/15 backdrop-blur-lg">
                {animeData.map((_, index) => (
                    <span
                        key={index}
                        className="dot hover:bg-obsidian/60"
                        onClick={() => handleSlideChange(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default SpotlightNavigator;
