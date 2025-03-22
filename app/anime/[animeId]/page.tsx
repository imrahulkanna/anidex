import {getAnimeCharacters, getAnimeDataById, getAnimePromotionalVideos} from "@/app/lib/fetch";
import {StopLoading, ViewMoreLessBtn} from "@/components/UtilityComponents";
import {ClockIcon, DotFilledIcon} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import {PlayCircleIcon as PlayCircleOutline} from "@heroicons/react/24/outline"
import {PlayCircleIcon, PlayIcon } from "@heroicons/react/16/solid";
import AddToListButton from "@/components/AddToListButton";
import {character, streamingPartner} from "@/types/ApiResponse";
import dynamic from "next/dynamic";
import {isDataEmptyorUndefined} from "@/app/lib/utils";

const Anime = async ({ params }: { params: { animeId: string } }) => {
    const { animeId } = params;
    const animeData = await getAnimeDataById(parseInt(animeId));
    const characters = await getAnimeCharacters(parseInt(animeId));
    const promoVideos = await getAnimePromotionalVideos(parseInt(animeId));

    const PromotionVideoContainer = dynamic(
        () => import('../../../components/PromotionVideoContainer'),
        { ssr: false }
    );

    return (
        <div className="mt-[84px]">
            <StopLoading />
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
                                    <AddToListButton anime={animeData} dropDownPositionStyle="top" btnStyle="px-5 text-base" btnWidth="w-44" />
                                </div>
                                <div>
                                    <p className="line-clamp-3 leading-relaxed text-sm" id="synopsis-container">
                                        {animeData.synopsis}
                                    </p>
                                    <ViewMoreLessBtn
                                        styles="text-xs font-semibold"
                                    />
                                </div>
                                { animeData.streaming.length > 0 && (
                                    <div>
                                        <div className="font-semibold text-lg text-primary">Streaming on</div>
                                        <div className="grid grid-cols-2 gap-x-16 gap-y-3 px-4 font-medium">
                                            {animeData.streaming.map((stream: streamingPartner) => (
                                                <Link
                                                    href={stream.url}
                                                    target={`_blank`}
                                                    key={stream.name}
                                                    className="flex gap-1 items-center justify-between py-2 border-b-[0.5px] border-b-white/60 text-neutral-200 hover:underline hover:decoration-blue-300"
                                                >
                                                    <div>{stream.name}</div>
                                                    <div className="flex justify-center items-center gap-2 rounded-full border-[0.5px] border-b-white/60 py-1 px-3">
                                                        <PlayCircleOutline className="w-5 h-5 stroke-blue-300 stroke-2" />
                                                        Watch
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div></div>
                            </div>
                        </div>
                    </div>
                    {/* side column */}
                    <div className="w-[calc(25%-30px)] flex flex-col justify-center gap-3 text-sm px-7 py-16 bg-white/5 backdrop-blur-xl">
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
            <div className='w-full px-4 md:px-6 3xl:px-2'>
                {/* characters section */}
                {characters && (
                    <div id="characters" className="mt-10 md:px-4">
                        <h2 className="text-2xl font-bold text-primary mb-5">Characters & Voice Actors</h2>
                        <div className="flex flex-wrap gap-4 mx-auto">
                            {characters.splice(0,9).map((character: character) => (
                                <div key={character.character.mal_id} className="flex flex-grow items-center p-3 bg-white/10 rounded-md">
                                    <Image
                                        src={character.character.images.webp.image_url}
                                        alt={character.character.name}
                                        height={0}
                                        width={200}
                                        className="w-11 h-11 rounded-full object-cover"
                                    />
                                    <div className="w-52 px-2 py-1 flex flex-col gap-1 justify-between text-sm">
                                        <p>
                                            <span className="font-bold">{character.character.name}</span>{", "}
                                            <span className="text-xs">{character.role}</span>
                                        </p>
                                        <p className="text-right">{character.voice_actors[0].person.name}</p>
                                    </div>
                                    <Image
                                        src={character.voice_actors[0].person.images.jpg.image_url}
                                        alt={character.voice_actors[0].person.name}
                                        height={0}
                                        width={200}
                                        className="w-11 h-11 rounded-full object-cover grayscale"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* promotional videos section */}
                {!isDataEmptyorUndefined(promoVideos) && (
                    <PromotionVideoContainer promoVideos={promoVideos.splice(0,4)} />
                )}
            </div>
        </div>
    );
};

export default Anime;
