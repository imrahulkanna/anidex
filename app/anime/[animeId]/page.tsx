import { getAnimeDataById } from "@/app/lib/fetch";
import React from "react";

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
                    <div className="w-3/4 flex"></div>
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
                                <div className="py-1 px-2 border border-white/30 rounded-3xl text-xs">
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
