import { getAnimeDataById } from "@/app/lib/fetch";
import { ViewMoreLessBtn } from "@/components/UtilityComponents";
import { ClockIcon, DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PlayIcon, PlayCircleIcon } from "@heroicons/react/16/solid";
import {Button} from "@/components/ui/button";
import AddToListButton from "@/components/AddToListButton";

const Anime = async ({ params }: { params: { animeId: string } }) => {
    const { animeId } = params;
    const animeData = await getAnimeDataById(parseInt(animeId));
    return (
        <div className="mt-[84px]">
            {/* description section */}
            <div className="relative">
                <div className="absolute w-full top-0 left-0 right-0 bottom-0 overflow-hidden grayscale">
                    <div
                        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-35 bg-center bg-cover blur-xl"
                        style={{ backgroundImage: `url(${animeData.images.webp.large_image_url})` }}
                    ></div>
                </div>
                <div className="w-full flex">
                    {/* main column */}
                    <div className="w-3/4 z-20 py-16">
                        <div className="mx-auto my-auto flex gap-10 items-start justify-center w-10/12 2xl:w-8/12">
                            <Image
                                src={animeData.images.webp.large_image_url}
                                alt={animeData.title_english || animeData.title}
                                height={0}
                                width={140}
                                className="w-52"
                            />
                            <div className="flex flex-col gap-5 text-sm">
                                <h1 className="text-5xl font-bold">
                                    {animeData.title_english || animeData.title}
                                </h1>
                                <div className="flex gap-1 items-center">
                                    <div className="p-1 px-1.5 bg-neutral-100 text-neutral-900 rounded-sm font-semibold text-xs">
                                        {animeData.rating.split(" -")[0]}
                                    </div>
                                    <div className="p-1 px-1.5 flex gap-1 items-center justify-center bg-secondary rounded-sm">
                                        <PlayCircleIcon className="w-4 h-4" strokeWidth={2} />
                                        <span className="font-semibold text-xs">
                                            {animeData.episodes ? animeData.episodes : "N/A"}
                                        </span>
                                    </div>
                                    <DotFilledIcon className="opacity-60" />
                                    <Link href="" className="hover:text-primary">
                                        {animeData.type}
                                    </Link>
                                    <DotFilledIcon className="opacity-60" />
                                    <div className="flex gap-1 items-center">
                                        <ClockIcon className="w-4 h-4" />
                                        <p>{animeData.duration?.split(" per ep")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-start items-center">
                                    <button
                                        className="h-9 px-5 py-2 shadow rounded-full font-semibold flex gap-1 items-center justify-center bg-primary text-neutral-900 text-base hover:bg-primary/80"
                                    >
                                        <PlayIcon className="w-5 h-5" />
                                        Watch
                                    </button>
                                    <AddToListButton anime={animeData} dropDownPositionStyle="top" btnStyle="w-44 px-5 text-base" />
                                </div>
                                <div>
                                    <p className="line-clamp-3 leading-relaxed text-sm" id="synopsis-container">
                                        {animeData.synopsis}
                                    </p>
                                    <ViewMoreLessBtn
                                        styles="text-xs font-semibold"
                                        id="synopsis-container"
                                    />
                                </div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    {/* side column */}
                    <div className="w-[calc(25%-30px)] flex flex-col gap-3 text-sm px-7 py-16 bg-white/5 backdrop-blur-xl">
                        <div>
                            <span className="font-bold">Japanese:</span>{" "}
                            <span>{animeData.title_japanese}</span>
                        </div>
                        <div>
                            <span className="font-bold">Synonyms:</span>{" "}
                            <span>{animeData.title_synonyms.join(", ") || "N/A"}</span>
                        </div>
                        <div>
                            <span className="font-bold">Aired:</span>{" "}
                            <span>{animeData.aired.string}</span>
                        </div>
                        <div>
                            <span className="font-bold">Premiered:</span>{" "}
                            <span className="capitalize">{`${animeData.season} ${animeData.year}`}</span>
                        </div>
                        <div>
                            <span className="font-bold">Duration:</span>{" "}
                            <span>{animeData.duration.split(" per ep")}</span>
                        </div>
                        <div>
                            <span className="font-bold">Status:</span>{" "}
                            <span>{animeData.status}</span>
                        </div>
                        <div>
                            <span className="font-bold">MAL Score:</span>{" "}
                            <span>{animeData.score}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap border-y-[0.5px] border-y-white/30 py-3">
                            <span className="font-bold">Genres:</span>
                            {animeData.genres.map((genre: { name: string }) => (
                                <div key={genre.name} className="py-1 px-2 border border-white/30 rounded-3xl text-xs">
                                    {genre.name}
                                </div>
                            ))}
                        </div>
                        <div>
                            <span className="font-bold">Studios:</span>{" "}
                            <span>
                                {animeData.studios
                                    .map((studio: { name: string }) => studio.name)
                                    .join(", ")}
                            </span>
                        </div>
                        <div>
                            <span className="font-bold">Producers:</span>{" "}
                            <span>
                                {animeData.producers
                                    .map((producer: { name: string }) => producer.name)
                                    .join(", ")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Anime;
