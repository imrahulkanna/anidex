"use client";
import { useState } from "react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid";

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
