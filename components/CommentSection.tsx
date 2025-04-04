"use client";
import { Comment as CommentType } from "@/model/Comments";
import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import Image from "next/image";
import { DotFilledIcon, ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { ChatBubbleBottomCenterIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

const Comment = ({ comment }: { comment: CommentType }) => {
    const currentDate: Date = new Date();
    const createdDate: Date = new Date(comment.createdAt.toString());
    const relativeTime: number = (currentDate.getTime() - createdDate.getTime()) / 1000;
    console.log("relativeTime", relativeTime);

    let displayTime: string;

    if (relativeTime >= 60 * 60 * 24) {
        displayTime = `${Math.floor(relativeTime / (60 * 60 * 24))}d ago`;
    } else if (relativeTime >= 60 * 60) {
        displayTime = `${Math.floor(relativeTime / (60 * 60))}h ago`;
    } else if (relativeTime >= 60) {
        displayTime = `${Math.floor(relativeTime / 60)}m ago`;
    } else if (relativeTime > 1) {
        displayTime = `${relativeTime}s ago`;
    } else {
        displayTime = "a moment ago";
    }

    return (
        <div className="flex gap-3 w-full text-sm">
            <Image
                src="/loadUserProfile.jpg"
                alt="user profile"
                width={30}
                height={30}
                className="rounded-full w-8 h-8"
            />
            <div className="mt-1 flex flex-col">
                <div className="mb-2 flex gap-1 items-center">
                    <div className="font-medium">@{comment.userName}</div>
                    <DotFilledIcon width={10} height={10} color="gray" />
                    <div className="text-xs text-neutral-500">{displayTime}</div>
                </div>
                <div className="text-neutral-400 mb-2">{comment.content}</div>
                <div className="flex gap-3 text-xs text-neutral-400">
                    <div className="flex items-center gap-1 mb-4">
                        <ThickArrowUpIcon width={20} height={20} className="cursor-pointer" />
                        <span>0</span>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                        <ThickArrowDownIcon width={20} height={20} className="cursor-pointer" />
                        <span>0</span>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                        <ChatBubbleOvalLeftIcon width={20} height={20} className="cursor-pointer" />
                        <span>Reply</span>
                    </div>
                </div>
                {comment.replies.map((reply) => (
                    <Comment comment={reply} key={reply._id as string} />
                ))}
            </div>
        </div>
    );
};

const CommentSection = ({ animeId }: { animeId: string }) => {
    const [comments, setComments] = useState<CommentType[] | []>([]);
    const [userInput, setUserInput] = useState<string>("");

    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const response = await fetch(`/api/comments?animeId=${parseInt(animeId)}`, {
                    method: "GET",
                    cache: "no-cache",
                });

                const data = await response.json();
                setComments(data.data);
            } catch (error) {
                console.log("Failed to get comments", error);
            }
        };

        fetchAllComments();
    }, []);

    const handleInputChange = (name: string, value: string) => {
        setUserInput(value);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-5">Comments</h2>
            <div className="flex w-full gap-3 items-center">
                <Image
                    src="/loadUserProfile.jpg"
                    alt="user profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <InputBox
                    type="text"
                    placeholder="Add a comment"
                    name="comment"
                    inputValue={userInput}
                    onInputChange={handleInputChange}
                />
            </div>
            <div className="mt-5">
                {comments.map((comment) => (
                    <Comment comment={comment} key={comment._id as string} />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
