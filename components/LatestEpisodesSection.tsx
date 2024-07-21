"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { latestEps } from "./CategoryAnimes";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { animeData } from "./TrendingAnimeList";
import { getAnimeDataById } from "@/app/lib/fetch";
import HoverCardWrapper from "./HoverCardWrapper";

const LatestEpisodesSection = ({ latestEpsData }: { latestEpsData: Array<latestEps> | null }) => {
    const [animeDetails, setAnimeDetails] = useState<animeData | undefined>();

    const getAnimeDetails = async (id: number) => {
        try {
            const response = await getAnimeDataById(id);
            setAnimeDetails(response);
        } catch (error) {
            console.log("Unable to fetch anime details", error);
            setAnimeDetails(undefined);
        }
    };

    if (!latestEpsData) {
        return null;
    }

    return (
        !isDataEmptyorUndefined(latestEpsData) &&
        latestEpsData.slice(0, 10).map((anime: latestEps) => (
            <div key={anime.entry.mal_id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                <div
                    className="my-4 relative"
                    onMouseEnter={async () => await getAnimeDetails(anime.entry.mal_id)}
                >
                    <HoverCardWrapper anime={animeDetails}>
                        <Image
                            src={anime?.entry?.images?.webp?.large_image_url}
                            alt={anime.entry.title}
                            width={300}
                            height={0}
                            className="w-full h-[250px] md:h-[300px] xl:h-[250px] 2xl:h-[320px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 to-30%" />
                    </HoverCardWrapper>
                </div>
                <Link href="#">
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold hover:text-primary">
                        {anime.entry.title}
                    </p>
                </Link>
                <div className="flex items-center gap-0.5 text-sm">
                    <div className="opacity-60 font-medium">{anime.episodes[0].title}</div>
                </div>
            </div>
        ))
    );
};

export default LatestEpisodesSection;
