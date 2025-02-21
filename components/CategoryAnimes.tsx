import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLatestEpisodes, getNewReleasedAnimes, getUpcomingSeasonAnimes } from "@/app/lib/fetch";
import { categoryListType } from "./FeaturedAnimes";
import { DotFilledIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import {} from "@/app/lib/utils";
import HoverCardWrapper from "./HoverCardWrapper";
import LatestEpisodesSection from "./LatestEpisodesSection";
import { animeData, latestEps } from "@/types/ApiResponse";
import { apiCallHandler } from "@/app/lib/server-utils";
import { DAY, HOUR } from "@/app/lib/constants";

const CategoryAnimes = async ({ title }: categoryListType) => {
    let data: Array<animeData> | null = null;
    let latestEpsData: Array<latestEps> | null = null;

    switch (title) {
        case "New Releases":
            // data = await getNewReleasedAnimes();
            data =
                (await apiCallHandler(getNewReleasedAnimes, "NEWRELEASEDANIMES", 1 * HOUR)) || [];
            break;

        case "Top Upcoming":
            // data = await getUpcomingSeasonAnimes();
            data =
                (await apiCallHandler(
                    getUpcomingSeasonAnimes,
                    "TOPUPCOMINGANIMES",
                    1 * DAY
                )) || [];
            break;

        case "Latest Episodes":
            // latestEpsData = await getLatestEpisodes();
            latestEpsData =
                (await apiCallHandler(getLatestEpisodes, "LATESTEPISODES", 1 * DAY)) || [];
            break;

        default:
            break;
    }

    const getFormattedDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        const formattedDate: string = date.toLocaleDateString("en-US", options);
        return formattedDate;
    };

    return (
        <div id={title.split(" ").join("-").toLowerCase()} className="w-full mb-10">
            <div className="flex justify-between items-center px-0 md:px-4">
                <h3 className="font-bold text-2xl">{title}</h3>
                <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                    <p className="text-xs font-medium">View more</p> <ChevronRightIcon />
                </Link>
            </div>
            <div className="flex flex-wrap [&>*:nth-child(odd)]:pr-2 [&>*:nth-child(even)]:pl-2 md:[&>*:nth-child(odd)]:px-4 md:[&>*:nth-child(even)]:px-4">
                {title === "Latest Episodes" ? (
                    <LatestEpisodesSection latestEpsData={latestEpsData} />
                ) : (
                    !isDataEmptyorUndefined(data) &&
                    data?.slice(0, 10).map((anime: animeData) => (
                        <div key={anime.mal_id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                            <div className="my-4 relative">
                                <HoverCardWrapper anime={anime}>
                                    <Image
                                        src={anime.images.webp.large_image_url}
                                        alt={anime.title_english || anime.title}
                                        width={300}
                                        height={0}
                                        className="w-full h-[250px] md:h-[300px] xl:h-[250px] 2xl:h-[320px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-30%" />
                                </HoverCardWrapper>
                            </div>
                            <Link href="#">
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold hover:text-primary">
                                    {anime.title_english || anime.title}
                                </p>
                            </Link>
                            <div className="flex items-center gap-0.5 text-sm">
                                <div className="opacity-60 font-medium">{anime.type || "TV"}</div>
                                <DotFilledIcon
                                    className={`opacity-30 ${
                                        title === "Top Upcoming" && "hidden md:block"
                                    }`}
                                />
                                <div className="opacity-60">
                                    {anime.episodes ? (
                                        <span
                                            className={`font-medium ${
                                                title === "Top Upcoming" && "hidden md:block"
                                            }`}
                                        >
                                            {anime.episodes} eps
                                        </span>
                                    ) : (
                                        <span
                                            className={`${
                                                title === "Top Upcoming" ? "hidden md:block" : ""
                                            }`}
                                        >
                                            N/A
                                        </span>
                                    )}
                                </div>
                                {title === "Top Upcoming" && (
                                    <>
                                        <DotFilledIcon className="opacity-30" />
                                        <div className="opacity-60 font-medium">
                                            {anime.aired.string.split(" to ")[0]}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryAnimes;
