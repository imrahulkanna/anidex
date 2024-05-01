import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getNewReleasedAnimes } from "@/app/lib/fetch";
import { categoryListType } from "./FeaturedAnimes";
import { animeData } from "./TrendingAnimeList";
import { DotFilledIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const CategoryAnimes = async ({ title }: categoryListType) => {
    let data: Array<animeData> | null;

    switch (title) {
        case "New Releases":
            data = await getNewReleasedAnimes();
            break;

        default:
            data = null;
            break;
    }
    return (
        <>
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
                            <div className="flex items-center gap-1">
                                <div className="opacity-50 font-medium">{anime.type}</div>
                                <DotFilledIcon className="opacity-30" />
                                <div>
                                    {anime.episodes ? (
                                        <span className="font-medium">{anime.episodes} eps</span>
                                    ) : (
                                        <span className="opacity-80">???</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default CategoryAnimes;
