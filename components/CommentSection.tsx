"use client";
import { Comment as CommentType } from "@/model/Comments";
import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import Image from "next/image";
import { DotFilledIcon, ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { useUserData } from "@/context/UserDataContext";
import { useSession } from "next-auth/react";
import mongoose, { ObjectId } from "mongoose";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { useLoginModal } from "@/context/LoginModalContext";

const Comment = ({
    comment,
    submitComment,
    animeId,
}: {
    comment: CommentType;
    submitComment: (arg: CommentType) => void;
    animeId: string;
}) => {
    const { data: session, status } = useSession();
    const { userData } = useUserData();
    const { setOpenLoginModal } = useLoginModal();

    const [replyInput, setReplyInput] = useState<string>("");
    const [displayReplyBox, setDisplayReplyBox] = useState<boolean>(false);

    const currentDate: Date = new Date();
    const createdDate: Date = new Date(comment.createdAt.toString());
    const relativeTime: number = (currentDate.getTime() - createdDate.getTime()) / 1000;
    let displayTime: string;

    if (relativeTime >= 60 * 60 * 24) {
        displayTime = `${Math.floor(relativeTime / (60 * 60 * 24))}d ago`;
    } else if (relativeTime >= 60 * 60) {
        displayTime = `${Math.floor(relativeTime / (60 * 60))}h ago`;
    } else if (relativeTime >= 60) {
        displayTime = `${Math.floor(relativeTime / 60)}m ago`;
    } else if (relativeTime > 1) {
        displayTime = `${Math.floor(relativeTime)}s ago`;
    } else {
        displayTime = "a moment ago";
    }

    const handleReplyInputChange = (name: string, value: string) => {
        setReplyInput(value);
    };

    const handleReplyButton = async () => {
        if (isDataEmptyorUndefined(session) || status != "authenticated") {
            setOpenLoginModal(true);
            return;
        }

        const newReply = {
            _id: new mongoose.Types.ObjectId(), // Generate a unique ID for the comment
            userId: session?.user._id as unknown as ObjectId,
            userName: userData.username,
            userImg: userData.image,
            animeId: parseInt(animeId),
            content: replyInput.trim(),
            parentId: comment._id,
            upVotes: 0,
            downVotes: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            replies: [],
        } as unknown as CommentType;

        await submitComment(newReply);

        setReplyInput("");
        setDisplayReplyBox(false);
    };

    const handleCancelButton = () => {
        setReplyInput("");
        setDisplayReplyBox(false);
    };

    return (
        <div className="flex gap-3 w-full text-sm">
            <Image
                src={comment.userImg || "/loadUserProfile.jpg"}
                alt="user profile"
                width={30}
                height={30}
                className="rounded-full w-8 h-8"
            />
            <div className="w-full mt-1 flex flex-col">
                <div className="mb-2 flex gap-1 items-center">
                    <div className="font-medium">@{comment.userName}</div>
                    <DotFilledIcon width={10} height={10} color="gray" />
                    <div className="text-xs text-neutral-500">{displayTime}</div>
                </div>
                <div className="text-neutral-400 mb-2">{comment.content}</div>
                <div className="flex items-center text-xs text-neutral-400 mb-4">
                    <div className="flex items-center">
                        <div className="p-2 cursor-pointer rounded-full hover:bg-neutral-600 hover:text-neutral-50">
                            <ThickArrowUpIcon width={20} height={20} className="" />
                        </div>
                        <div>{comment.upVotes - comment.downVotes}</div>
                        <div className="p-2 cursor-pointer rounded-full hover:bg-neutral-600 hover:text-neutral-50">
                            <ThickArrowDownIcon width={20} height={20} className="" />
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-neutral-600 hover:text-neutral-50 cursor-pointer"
                        onClick={() => setDisplayReplyBox(true)}
                    >
                        <ChatBubbleOvalLeftIcon width={20} height={20} />
                        <span>Reply</span>
                    </div>
                </div>
                {displayReplyBox && (
                    <div className="w-full flex flex-col mb-1">
                        <InputBox
                            type="text"
                            placeholder="Add a comment"
                            name="comment"
                            inputValue={replyInput}
                            onInputChange={handleReplyInputChange}
                        />
                        <div className="mt-3 flex flex-row-reverse gap-2 text-sm font-semibold">
                            <button
                                disabled={replyInput.trim().length === 0}
                                className={`px-4 py-2 rounded-full ${
                                    replyInput.trim().length === 0
                                        ? "bg-neutral-600 opacity-50"
                                        : " bg-primary/75 hover:bg-primary text-black"
                                }`}
                                onClick={handleReplyButton}
                            >
                                Comment
                            </button>
                            <button
                                className="px-4 py-2 rounded-full hover:bg-neutral-600"
                                onClick={handleCancelButton}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                {comment.replies.map((reply) => (
                    <Comment
                        comment={reply}
                        key={reply._id as string}
                        submitComment={submitComment}
                        animeId={animeId}
                    />
                ))}
            </div>
        </div>
    );
};

const CommentSection = ({ animeId }: { animeId: string }) => {
    const { data: session, status } = useSession();
    const { userData } = useUserData();
    const { setOpenLoginModal } = useLoginModal();

    const [comments, setComments] = useState<CommentType[] | []>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [displayCommentBtns, setDisplayCommentBtns] = useState<boolean>(false);

    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const response = await fetch(`/api/comments?animeId=${parseInt(animeId)}`, {
                    method: "GET",
                    cache: "no-cache",
                });

                const data = await response.json();
                data.data.forEach((comment:CommentType) => {
                    comment.replies.sort(
                        (a: CommentType, b: CommentType) => new Date(b.createdAt.toString()).getTime() - new Date(a.createdAt.toString()).getTime()
                    );
                });
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

    const appendComment = (commentsArr: CommentType[], newComment: CommentType): boolean => {
        for (const comment of commentsArr) {
            if (comment._id === newComment.parentId) {
                comment.replies.unshift(newComment);
                return true;
            } else if (comment.replies.length > 0) {
                const found = appendComment(comment.replies, newComment);
                if (found) {
                    return true;
                }
            }
        }

        return false;
    };

    const submitComment = async (newComment: CommentType) => {
        try {
            const { userId, userName, userImg, animeId, content, parentId } = newComment;
            const requestBody = { userId, userName, userImg, animeId, content, parentId };

            await fetch("/api/comments", {
                method: "POST",
                cache: "no-cache",
                body: JSON.stringify(newComment),
            });
        } catch (error) {
            console.log("Failed to save the comment", error);
        }

        const updatedComments = [...comments];
        if (newComment.parentId === null) {
            updatedComments.unshift(newComment);
        } else {
            appendComment(updatedComments, newComment);
        }
        setComments(updatedComments);
    };

    const handleCommentButton = async () => {
        if (isDataEmptyorUndefined(session) || status != "authenticated") {
            setOpenLoginModal(true);
            return;
        }

        const newComment = {
            _id: new mongoose.Types.ObjectId(), // Generate a unique ID for the comment
            userId: session?.user._id as unknown as ObjectId,
            userName: userData.username,
            userImg: userData.image,
            animeId: parseInt(animeId),
            content: userInput.trim(),
            parentId: null,
            upVotes: 0,
            downVotes: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            replies: [],
        } as unknown as CommentType;

        await submitComment(newComment);

        setUserInput("");
        setDisplayCommentBtns(false);
    };

    const handleCancelButton = () => {
        setUserInput("");
        setDisplayCommentBtns(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-5">Comments</h2>
            <div className="w-full flex flex-col">
                <InputBox
                    type="text"
                    placeholder="Add a comment"
                    name="comment"
                    inputValue={userInput}
                    onInputChange={handleInputChange}
                    onFocus={() => setDisplayCommentBtns(true)}
                />
                {displayCommentBtns && (
                    <div className="mt-3 flex flex-row-reverse gap-2 text-sm font-semibold">
                        <button
                            disabled={userInput.trim().length === 0}
                            className={`px-4 py-2 rounded-full ${
                                userInput.trim().length === 0
                                    ? "bg-neutral-600 opacity-50"
                                    : " bg-primary/75 hover:bg-primary text-black"
                            }`}
                            onClick={handleCommentButton}
                        >
                            Comment
                        </button>
                        <button
                            className="px-4 py-2 rounded-full hover:bg-neutral-600"
                            onClick={handleCancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-5">
                {comments.map((comment) => (
                    <Comment
                        comment={comment}
                        key={comment._id as string}
                        submitComment={submitComment}
                        animeId={animeId}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
