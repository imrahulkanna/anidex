import React from "react";
import WeeklyReleasesClient from "./WeeklyReleasesClient";
import { getScheduledReleases } from "@/app/lib/fetch";
import { animeData } from "./TrendingAnimeList";
import { apiCallHandler } from "@/app/lib/utils";

const WeeklyReleases = () => {
    const fetchWeeklyReleases = async (day: string): Promise<animeData[]> => {
        "use server"
        // const data = await getScheduledReleases(day.toLocaleLowerCase());
        const data = await apiCallHandler(getScheduledReleases, day.toLocaleLowerCase());
        return data;
    };

    return <WeeklyReleasesClient fetchWeeklyReleases={fetchWeeklyReleases} />;
};

export default WeeklyReleases;
