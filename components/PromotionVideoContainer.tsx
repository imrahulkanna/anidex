"use client"
import {promoVideos} from "@/types/ApiResponse";
import {useEffect, useState} from "react";
import Image from "next/image";
import {PlayIcon} from "@heroicons/react/16/solid";

const PromotionalVideo = ({video, index, YTplayer}: {
    video: promoVideos,
    index: number,
    YTplayer: (typeof window.YT.Player | null)
}) => {
    const [play, setPlay] = useState(false);

    const handleClick = () => {
        setPlay(!play);
        console.log("clicked", !play)
    };

    useEffect(() => {
        if (YTplayer) {
            if (play) {
                YTplayer.playVideo();
            } else {
                YTplayer.pauseVideo();
            }
        }
    }, [play]);

    return (
        <div
            key={video.title}
            className="h-52 min-w-[280px] flex flex-col flex-grow items-center relative"
            onClick={handleClick}
        >
            {!play && (
                <div className="absolute top-0 left-0 w-full h-full cursor-pointer">
                    <div className="bg-black/35 absolute top-0 left-0 w-full h-full z-20"></div>
                    <Image
                        src={video.trailer.images.maximum_image_url as string}
                        alt={video.title}
                        width={200}
                        height={0}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <PlayIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-30"/>
                </div>
            )}
            <div id={`youtube-player-${index}`} className="w-full h-full"></div>
        </div>
    );
}

const PromotionVideoContainer = ({promoVideos}: { promoVideos: promoVideos[] }) => {
    const [players, setPlayers] = useState<(typeof window.YT.Player | null)[]>([]);

    useEffect(() => {
        const loadYTPlayers = () => {
            const newPlayers = promoVideos.map((video, index) => {
                const videoId = video.trailer.embed_url.split("?")[0].split("embed/")[1];
                if (!videoId) {
                    console.error("Invalid embed URL:", video.trailer.embed_url);
                    return null;
                }

                return new window.YT.Player(`youtube-player-${index}`, {
                    videoId: videoId,
                    events: {},
                });
            });

            setPlayers(newPlayers);
        };

        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.async = true;
            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadYTPlayers;
        }
    }, [promoVideos]);

    return (
        <div id="promo-videos" className="my-10 md:px-4">
            <h2 className="text-2xl font-bold text-primary mb-5">Promotion Videos</h2>
            <div className="flex flex-wrap gap-4 mx-auto">
                {promoVideos.map((video: promoVideos, index: number) => (
                    <PromotionalVideo key={video.title} video={video} index={index} YTplayer={players[index]}/>
                ))}
            </div>
        </div>
    )
}

export default PromotionVideoContainer;
