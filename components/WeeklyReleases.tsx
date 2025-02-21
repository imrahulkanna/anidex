import React from "react";
import WeeklyReleasesClient from "./WeeklyReleasesClient";
import { getScheduledReleases } from "@/app/lib/fetch";
import { animeData } from "@/types/ApiResponse";
import { apiCallHandler } from "@/app/lib/server-utils";
import { HOUR } from "@/app/lib/constants";

const WeeklyReleases = () => {
    const fetchWeeklyReleases = async (day: string): Promise<animeData[]> => {
        "use server";
        // const data = await getScheduledReleases(day.toLocaleLowerCase());
        const data = await apiCallHandler(
            getScheduledReleases,
            `WEEKLYRELEASE_${day.toUpperCase()}`,
            18 * HOUR,
            day.toLocaleLowerCase()
        );
        return data;
    };

    return <WeeklyReleasesClient fetchWeeklyReleases={fetchWeeklyReleases} />;
};

export default WeeklyReleases;
