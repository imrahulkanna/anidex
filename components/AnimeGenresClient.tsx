"use client";
import React, { useState } from "react";

interface genre {
    mal_id: number;
    name: string;
    url: string;
    count: number;
}

const AnimeGenresClient = ({ genreData }: { genreData: genre[] }) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [genreCount, setGenreCount] = useState<number>();

    const handleShowMore = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (!showMore) {
            setGenreCount(genreData.length);
        } else {
            setGenreCount(genreData.length / 3 + 1);
        }
        setShowMore(!showMore);
    };

    const getRandomColorClass = () => {
        const colors = [
            "text-red-300",
            "text-blue-300",
            "text-green-300",
            "text-yellow-300",
            "text-purple-300",
            "text-pink-300",
            "text-indigo-300",
            "text-teal-300",
            "text-cyan-300",
            "text-amber-300",
            "text-emerald-300",
            "text-fuchsia-300",
            "text-violet-300",
            "text-sky-300",
            "text-rose-300",
            "text-lime-300",
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    return (
        <div id="genres">
            <h3 className="font-bold text-2xl mb-4">Genres</h3>
            <div className="bg-white/10 p-5 rounded-sm">
                <div className="w-full flex gap-5 flex-wrap mb-4">
                    {genreData.slice(0, genreCount).map((genre: genre) => (
                        <p
                            key={genre.mal_id}
                            className={`${getRandomColorClass()} py-1 px-2 font-semibold rounded-md cursor-pointer hover:bg-white/[0.12]`}
                        >
                            {genre.name}
                        </p>
                    ))}
                </div>
                <button
                    onClick={handleShowMore}
                    className="w-full bg-white/10 mx-auto text-neutral-50 py-2 px-4 font-bold rounded-[5px] hover:bg-white/[0.12]"
                >
                    {showMore ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
};

export default AnimeGenresClient;
