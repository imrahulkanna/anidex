import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getNewReleasedAnimes, getUpcomingSeasonAnimes } from "@/app/lib/fetch";
import { categoryListType } from "./FeaturedAnimes";
import { animeData } from "./TrendingAnimeList";
import { DotFilledIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const CategoryAnimes = async ({ title }: categoryListType) => {
    let data: Array<animeData> | null;

    switch (title) {
        case "New Releases":
            data = await getNewReleasedAnimes();
            break;

        case "Top Upcoming":
            data = await getUpcomingSeasonAnimes();
            break;

        default:
            data = null;
            break;
    }

    const getFormattedDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        const formattedDate: string = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    return (
        <div id={title.split(" ").join("-").toLowerCase()} className="w-full mb-10">
            <div className="flex justify-between items-center px-0 md:px-4">
                <h3 className="font-bold text-2xl">{title}</h3>
                <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                    <p className="text-xs">View more</p> <ChevronRightIcon />
                </Link>
            </div>
            <div className="flex flex-wrap [&>*:nth-child(odd)]:pr-2 [&>*:nth-child(even)]:pl-2 md:[&>*:nth-child(odd)]:px-4 md:[&>*:nth-child(even)]:px-4">
                {data &&
                    data.slice(0, 10).map((anime: animeData) => (
                        <div key={anime.mal_id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                            <div className="py-4">
                                <Image
                                    src={anime.images.webp.large_image_url}
                                    alt={anime.title_english || anime.title}
                                    width={300}
                                    height={0}
                                    className="w-full h-[196px] md:h-[300px] xl:h-[250px] 2xl:h-[320px] object-cover"
                                />
                            </div>
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold">
                                {anime.title_english || anime.title}
                            </p>
                            <div className="flex items-center gap-0.5 text-sm">
                                <div className="opacity-60 font-medium">{anime.type || "TV"}</div>
                                <DotFilledIcon className="opacity-30" />
                                <div className="opacity-60">
                                    {anime.episodes ? (
                                        <span className="font-medium">{anime.episodes} eps</span>
                                    ) : (
                                        <span>???</span>
                                    )}
                                </div>
                                {title === "Top Upcoming" && anime.aired.from && (
                                    <>
                                        <DotFilledIcon className="opacity-30" />
                                        <div className="opacity-60 font-medium">
                                            {getFormattedDate(anime.aired.from)}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CategoryAnimes;
