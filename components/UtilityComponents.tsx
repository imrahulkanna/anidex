"use client";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { useLoading } from "@/context/LoadingContext";
import Link from "next/link";

export const ViewMoreLessBtn = ({ styles }: { styles: string }) => {
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
        <div
            className="inline-flex items-center cursor-pointer hover:text-primary"
            onClick={handleClick}
        >
            <span className={styles} style={{ display: "inline" }}>
                {showMore ? "View less" : "View more"}
            </span>
            {showMore ? (
                <ChevronUpIcon className="w-4 h-4" />
            ) : (
                <ChevronDownIcon className="w-4 h-4" />
            )}
        </div>
    );
};

export const ButtonLink = ({
    children,
    link,
    styles,
    startLoading,
}: {
    children: React.ReactNode;
    link: string;
    styles?: string;
    startLoading?: boolean;
}) => {
    const { setLoading } = useLoading();

    const handleOnClick = () => {
        if (startLoading) setLoading(true);
    };

    return (
        <Link href={link} onClick={handleOnClick} className={styles}>
            {children}
        </Link>
    );
};


export const StopLoading = () => {
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(false);
    
    }, []);
    
    return <></>
}