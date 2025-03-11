"use client";
import { useState } from "react";
import {ChevronDownIcon, ChevronUpIcon, PlayIcon} from "@heroicons/react/16/solid";
import {promoVideos} from "@/types/ApiResponse";
import Image from "next/image";

export const ViewMoreLessBtn = ({ styles, id }: { styles: string; id: string }) => {
    const [showMore, setShowMore] = useState(false);

    const handleClick = () => {
        setShowMore(!showMore);
        const collapsibleEle = document.getElementById("synopsis-container");
        if (showMore && collapsibleEle) {
            collapsibleEle.className += " line-clamp-3";
        } else {
            if (collapsibleEle) {
                collapsibleEle.className = collapsibleEle.className
                    .replace("line-clamp-3", "")
                    .trim();
            }
        }
    };
    return (
        <div className="inline-flex items-center cursor-pointer hover:text-primary" onClick={handleClick}>
            <span className={styles} style={{"display":"inline"}}>
                {showMore ? "View less" : "View more"}
            </span>
            {
                showMore ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
            }

        </div>
    );
};

export const PromotionalVideo = ({video, index}: {video: promoVideos, index: number}) => {
    const [play, setPlay] = useState(false);

    const handleClick = () => {
        setPlay(true);
    };

    return (
        <div key={video.title} className="h-52 flex flex-col flex-grow items-center relative" onClick={handleClick}>
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
                    <PlayIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-30" />
                </div>
            )}

            <iframe
                id={`youtube-player-${index}`}
                src={video.trailer.embed_url}
                allowFullScreen={true}
                className="w-full h-full">
            </iframe>
        </div>
    );
}
