import { DAY } from "@/app/lib/constants";
import { getTrendingAnimes } from "@/app/lib/fetch";
import { apiCallHandler } from "@/app/lib/server-utils";
import { animeData } from "@/types/ApiResponse";
import Image from "next/image";
import React from "react";

const SpotlightAnimes = async () => {
    const anime: animeData =
        (await apiCallHandler(getTrendingAnimes, "TRENDINGANIMES", 3 * DAY))[0] || [];

    return (
        <div className="w-full flex mb-10 h-[550px] md:h-screen">
            <div className="hidden lg:block lg:w-1/3"></div>
            <div className="w-full lg:w-2/3 overflow-hidden mask-gradient">
                <Image
                    src={anime.images.webp.large_image_url}
                    alt={anime.title_english || anime.title}
                    height={0}
                    width={500}
                    className=" w-full h-full object-fill m-auto"
                />
            </div>
        </div>
    );
};

export default SpotlightAnimes;
