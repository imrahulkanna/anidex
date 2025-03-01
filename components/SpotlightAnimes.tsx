import SpotlightNavigator from "./SpotlightNavigator";
import { DAY } from "@/app/lib/constants";
import { getTrendingAnimes } from "@/app/lib/fetch";
import { apiCallHandler } from "@/app/lib/server-utils";
import { animeData } from "@/types/ApiResponse";
import { ChevronRightIcon, ClockIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const SpotlightAnimes = async () => {
    const animeData: animeData[] =
        (await apiCallHandler(getTrendingAnimes, "TRENDINGANIMES", 3 * DAY)) || [];
    const anime: animeData = animeData[0];

    return (
        <div className="w-full relative flex mb-10 h-[550px] md:h-screen">
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
            <div className="absolute bottom-[20px] lg:bottom-[20%] left-0 pl-10 3xl:pl-0 lg:w-1/2">
                <p className="text-primary font-medium text-lg mb-2">#1 Spotlight</p>
                <p className="font-bold text-2xl lg:text-5xl mb-8">
                    {anime.title_english || anime.title}
                </p>
                <div className="flex gap-5 items-center mb-5 text-sm font-bold">
                    <p className="p-1 px-3 bg-cyan-600 rounded-sm">{anime.type}</p>
                    <div className="p-1 px-2 flex gap-1 items-center justify-center bg-secondary rounded-sm">
                        <PlayCircleIcon className="w-4 h-4" />
                        {anime.episodes ? (
                            <span className="font-medium">{anime.episodes}</span>
                        ) : (
                            <span>N/A</span>
                        )}
                    </div>
                </div>
                <div className="hidden lg:flex gap-1 items-center mb-5">
                    <p>{anime.aired.string.split(" to")[0]}</p>
                    <DotFilledIcon className="opacity-60" />
                    <div className="flex gap-1 items-center">
                        <ClockIcon className="w-4 h-4" />
                        <p>{anime.duration?.split(" per ep")}</p>
                    </div>
                </div>
                <p className="hidden lg:line-clamp-3 font-medium leading-relaxed mb-5">
                    {anime.synopsis}
                </p>
                <div className="hidden lg:flex gap-5 mb-5">
                    {anime.genres.map((genre) => (
                        <div className="py-1 px-4 border rounded-3xl text-sm">{genre.name}</div>
                    ))}
                </div>
                <Link href="" className="underline text-sm">
                    <span>More Details</span>
                    <ChevronRightIcon strokeWidth={2.5} className="w-3 h-3 inline-block" />
                </Link>
            </div>
            <SpotlightNavigator animeData={animeData} />
        </div>
    );
};

export default SpotlightAnimes;
