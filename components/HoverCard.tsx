import React, { forwardRef, Ref, useState } from "react";
import { animeData, genre } from "./TrendingAnimeList";
import { StarFilledIcon, PlayIcon } from "@radix-ui/react-icons";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { Skeleton } from "./Skeleton";
import { Button } from "./ui/button";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useUserData } from "@/context/UserDataContext";

interface props {
    anime: animeData | undefined;
    handleOpenHover: () => void;
    handleCloseHover: () => void;
    cardPosition: string;
}

const HoverCardSkeleton = () => {
    return (
        <>
            <p className="bg-gray-500 h-2 mb-3 rounded-md"></p>
            <div className="flex items-center gap-5 mb-3">
                <div className="bg-gray-500 h-2 w-1/5 rounded-md"></div>
                <div className="bg-gray-500 h-2 w-1/5 px-1.5 py-[2px] rounded-md"></div>
                <div className="bg-gray-500 h-2 w-1/5 px-1.5 py-[2px] rounded-md"></div>
            </div>
            <p className="mb-3 h-2 bg-gray-500 rounded-md"></p>
            <p className="mb-2 h-2 w-3/4 bg-gray-500 rounded-md"></p>
            <p className="mb-2 h-2 w-3/4 bg-gray-500 rounded-md"></p>
            <p className="mb-2 h-2 w-3/4 bg-gray-500 rounded-md"></p>
            <p className="mb-2 h-2 w-3/4 bg-gray-500 rounded-md"></p>
            <p className="mb-2 h-2 w-3/4 bg-gray-500 rounded-md"></p>
        </>
    );
};

const HoverCard = forwardRef<HTMLDivElement, props>(
    ({ anime, handleOpenHover, handleCloseHover, cardPosition }, ref) => {
        const { userData, setUserData } = useUserData();

        const [addedToFav, setAddedToFav] = useState<boolean>(
            userData?.favourites.includes(anime?.mal_id) ? true : false
        );
        const { data: session } = useSession();

        const getGenres = (): string => {
            let genreString = "";
            anime?.genres.forEach((data: genre, index: number) => {
                genreString += data.name;
                if (index != anime.genres.length - 1) genreString += ", ";
            });
            return genreString;
        };

        const toggleFav = async () => {
            setAddedToFav(!addedToFav);
            let updatedFavs = [...userData?.favourites];
            if (addedToFav) {
                updatedFavs = updatedFavs.filter((id: number) => id !== anime?.mal_id);
            } else {
                updatedFavs.push(anime?.mal_id);
            }
            setUserData((prevState: object) => {
                return { ...prevState, favourites: updatedFavs };
            });

            try {
                const requestBody = {
                    userId: session?.user?._id,
                    animeId: anime?.mal_id,
                    requestType: addedToFav ? "remove" : "add",
                };

                const result = await fetch("/api/update-favourites", {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(requestBody),
                });
                const data = await result.json();

                if (!result.ok) {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.log("update-favourites failed: ", error);
                setAddedToFav(!addedToFav);
            }
        };

        return isDataEmptyorUndefined(anime) ? (
            <div
                className={`p-4 absolute left-1/2 z-50 bg-white/5 backdrop-blur-md text-neutral-300 rounded-md h-auto w-[300px] text-xs ${
                    cardPosition === "top" ? "bottom-1/2" : "top-1/2"
                }`}
            >
                <Skeleton>
                    <HoverCardSkeleton />
                </Skeleton>
            </div>
        ) : (
            <div
                className={`p-4 absolute left-1/2 z-50 bg-black/15 backdrop-blur-lg text-neutral-300 rounded-md h-auto w-[300px] text-xs border border-white/20 ${
                    cardPosition === "top" ? "bottom-1/2" : "top-1/2"
                }`}
                onMouseOver={handleOpenHover}
                onMouseLeave={handleCloseHover}
                ref={ref as Ref<HTMLDivElement>}
            >
                <p className="font-extrabold text-base text-white text-wrap mb-3">
                    {anime.title_english || anime.title}
                </p>
                <div className="flex items-center gap-5 mb-4">
                    <div className="flex items-center gap-1 font-semibold">
                        <StarFilledIcon color="gold" />
                        {anime.score || "N/A"}
                    </div>
                    <div className="bg-secondary  px-1.5 py-[2px] rounded-sm text-center text-white flex gap-1">
                        <PlayIcon fill="#fff" />
                        {anime.episodes ? (
                            <p className="font-semibold">{anime.episodes}</p>
                        ) : (
                            <span className="opacity-70">N/A</span>
                        )}
                    </div>
                    <div className="bg-primary px-1.5 py-[2px] rounded-sm text-center font-semibold text-white">
                        {anime.type ? (
                            anime.type
                        ) : (
                            <span className="font-normal opacity-70">N/A</span>
                        )}
                    </div>
                </div>
                <p className="mb-4 line-clamp-3">{anime.synopsis}</p>
                <p className="mb-1">
                    <span>Japanese</span>:{" "}
                    <span className="text-white">{anime.title_japanese}</span>
                </p>
                <p className="mb-1">
                    <span>Synonyms</span>:{" "}
                    <span className="text-white">{anime.title_synonyms.join(", ") || "N/A"}</span>
                </p>
                <p className="mb-1">
                    <span>Aired</span>:{" "}
                    <span className="text-white">
                        {anime.aired.string.split(" to ")[0] || "N/A"}
                    </span>
                </p>
                <p className="mb-1">
                    <span>Status</span>: <span className="text-white">{anime.status}</span>
                </p>
                <p className="mb-1">
                    <span>Genres</span>: <span className="text-white">{getGenres()}</span>
                </p>
                <div className="px-3 mt-3 flex gap-5 items-center">
                    <Button
                        className="w-full rounded-full font-semibold flex gap-2 items-center justify-center"
                        variant="secondary"
                    >
                        Add to wishlist
                    </Button>
                    <HeartIcon
                        className={`w-10 h-10 cursor-pointer${
                            addedToFav ? " stroke-red-600 fill-red-600" : ""
                        }`}
                        onClick={toggleFav}
                    />
                </div>
            </div>
        );
    }
);

HoverCard.displayName = "HoverCard";
export default HoverCard;
