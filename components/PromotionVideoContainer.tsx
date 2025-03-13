"use client"
import {promoVideos} from "@/types/ApiResponse";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {PlayIcon} from "@heroicons/react/16/solid";

const PromotionalVideo = ({video, index, iframeLoaded}: {
    video: promoVideos,
    index: number,
    iframeLoaded: boolean
}) => {
    const [play, setPlay] = useState(false);
    const ytPlayerRef = useRef<typeof window.YT.Player | null>(null);

    const handleClick = () => {
        setPlay(true);
        ytPlayerRef.current.playVideo();
    };

    const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
        console.log("Player State Change:", event.data);

        if (event.data === 2) {
            setPlay(false);
        } else {
            setPlay(true);
        }
    };

    useEffect(() => {
        if (iframeLoaded) {
            setTimeout(() => {
                const videoId = video.trailer.embed_url.split("?")[0].split("embed/")[1];
                ytPlayerRef.current = new window.YT.Player(`youtube-player-${index}`, {
                    videoId: videoId,
                    events: {
                        'onReady': () => console.log("ready player", index),
                        'onStateChange': (event: any) => handlePlayerStateChange(event)
                    },
                });
            }, 250);

            return () => {
                if (ytPlayerRef.current) {
                    ytPlayerRef.current.destroy();
                    ytPlayerRef.current = null;
                }
            };
        }
    }, [iframeLoaded, index, video.trailer.embed_url]);

    return (
        <div
            key={video.title}
            className="h-52 min-w-[280px] flex flex-col flex-grow items-center relative"
        >

            <div
                className={`absolute top-0 left-0 w-full h-full cursor-pointer ${play ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
                onClick={handleClick}
            >
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
            <div id={`youtube-player-${index}`} className="w-full h-full"></div>
        </div>
    );
}

const PromotionVideoContainer = ({promoVideos}: { promoVideos: promoVideos[] }) => {
    const [isIFrameLoaded, setIsIFrameLoaded] = useState(false);

    useEffect(() => {
        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.async = true;
            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                setIsIFrameLoaded(true);
            }
        }
    }, [promoVideos]);

    return (
        <div id="promo-videos" className="my-10 md:px-4">
            <h2 className="text-2xl font-bold text-primary mb-5">Promotion Videos</h2>
            <div className="flex flex-wrap gap-4 mx-auto">
                {promoVideos.map((video: promoVideos, index: number) => (
                    <PromotionalVideo key={video.title} video={video} index={index} iframeLoaded={isIFrameLoaded}/>
                ))}
            </div>
        </div>
    )
}

export default PromotionVideoContainer;
