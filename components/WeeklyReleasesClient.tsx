"use client";
import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import { animeData } from "./TrendingAnimeList";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface props {
    fetchWeeklyReleases: (day: string) => Promise<animeData[]>;
}

const WeeklyReleasesSkeleton = () => {
    return (
        <div className="w-full">
            {[...Array(7)].map((arr) => (
                <div className="w-full h-12 pb-6 flex items-center justify-between gap-10">
                    <div className="w-11/12 flex gap-8 font-bold">
                        <p className="bg-gray-500 rounded h-2 w-1/12"></p>
                        <p className="bg-gray-500 rounded h-2 w-11/12"></p>
                    </div>
                    <p className="w-1/5 md:w-1/12 bg-gray-500 rounded h-2 text-sm"></p>
                </div>
            ))}
            <div className="w-1/12 h-5">
                <p className="bg-gray-500 rounded h-2"></p>
            </div>
        </div>
    );
};

const WeeklyReleasesClient = ({ fetchWeeklyReleases }: props) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currDate = new Date();
    const currDay = days[currDate.getDay()];
    const dateArr = currDate.toString().split(" ");
    const date = `${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`;
    const [time, setTime] = useState<string>(date);
    const [selectedDay, setSelectedDay] = useState<string>(currDay);
    const [animeData, setAnimeData] = useState<animeData[] | null>(null);
    const [length, setLength] = useState(7);

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(async () => {
                const data = await fetchWeeklyReleases(selectedDay);
                setAnimeData(data);
            }, 250);
        };
        fetchData();
    }, [selectedDay]);

    const handleDayChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as Element;
        if (target.id === selectedDay) return;
        setSelectedDay(target.id);
        setAnimeData(null);
    };

    const handleViewMoreClick = () => {
        if (length === 7) {
            setLength(10);
        } else {
            setLength(7);
        }
    };

    return (
        <div id="scheduled-releases" className="md:px-4 mb-10">
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h3 className="font-bold text-2xl">Weekly Releases</h3>
                <div className="font-medium" suppressHydrationWarning={true}>
                    {time}
                </div>
            </div>
            <div>
                <div className="w-full flex items-center justify-between mb-8">
                    {days.map((day: string) => (
                        <button
                            key={day}
                            className={`${
                                day === selectedDay
                                    ? "bg-primary text-neutral-800 font-extrabold"
                                    : "bg-white/10 text-neutral-50 hover:bg-white/[0.2]"
                            } w-[12.5%] py-3 font-bold rounded-xl`}
                            onClick={handleDayChange}
                            id={day}
                        >
                            {day.slice(0, 3)}
                        </button>
                    ))}
                </div>
                {!isDataEmptyorUndefined(animeData) ? (
                    <div>
                        <div className="w-full">
                            {animeData && animeData?.length > 0 ? (
                                animeData
                                    ?.slice(0, length)
                                    .sort((a, b) =>
                                        (a.broadcast.time || "").localeCompare(
                                            b.broadcast.time || ""
                                        )
                                    )
                                    .map((anime: animeData) => (
                                        <Link
                                            href=""
                                            key={anime.mal_id}
                                            className="w-full pb-6 flex items-center justify-between hover:text-primary group"
                                        >
                                            <div className="w-3/4 md:w-10/12 flex gap-4 md:gap-8 font-bold">
                                                <p className="w-[50px] text-white/30 group-hover:text-primary">
                                                    {anime.broadcast.time
                                                        ? anime.broadcast.time
                                                        : "??:??"}
                                                </p>
                                                <p className="text-wrap">
                                                    {anime.title_english || anime.title}
                                                </p>
                                            </div>
                                            <p className="text-sm">
                                                Episode {anime.episodes ? anime.episodes : "?"}
                                            </p>
                                        </Link>
                                    ))
                            ) : (
                                <p className="w-full font-bold text-center text-neutral-200">
                                    No scheduled releases
                                </p>
                            )}
                        </div>
                        {animeData && animeData?.length > 7 && (
                            <p
                                className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer"
                                onClick={handleViewMoreClick}
                            >
                                {length === 7 ? "Show More" : "Show Less"}
                            </p>
                        )}
                    </div>
                ) : (
                    <WeeklyReleasesSkeleton />
                )}
            </div>
        </div>
    );
};

export default WeeklyReleasesClient;
