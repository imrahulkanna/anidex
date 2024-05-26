import React from "react";
import WeeklyReleasesClient from "./WeeklyReleasesClient";
import { getScheduledReleases } from "@/app/lib/fetch";
import { animeData } from "./TrendingAnimeList";

const WeeklyReleases = () => {
    const fetchWeeklyReleases = async (day: string): Promise<animeData[]> => {
        "use server"
        const data = await getScheduledReleases(day.toLocaleLowerCase());
        return data;
    };

    return <WeeklyReleasesClient fetchWeeklyReleases={fetchWeeklyReleases} />;
};

export default WeeklyReleases;
