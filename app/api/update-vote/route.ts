import { ANIMECOMMENTS } from "@/app/lib/constants";
import dbConnect from "@/app/lib/dbConnect";
import { deleteCacheData } from "@/app/lib/server-utils";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import CommentsModel from "@/model/Comments";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const { commentId, type, animeId, userId, actionType } = await request.json();

        if (isDataEmptyorUndefined(commentId) || isDataEmptyorUndefined(type)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "One of the required params is missing",
                },
                { status: 400 }
            );
        }

        const comment = await CommentsModel.findOne({ _id: commentId });

        if (isDataEmptyorUndefined(comment)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Cannot find any comment with id ${commentId}`,
                },
                { status: 404 }
            );
        }

        const voteKey = type === "upVote" ? "upVotes" : "downVotes";
        const voteKeyUsers = type === "upVote" ? "upVotedUsers" : "downVotedUsers";

        if (actionType === "add") {
            if (type === "upVote" && comment["downVotedUsers"].includes(userId)) {
                comment.downVotes -= 1;
                comment["downVotedUsers"] = comment["downVotedUsers"].filter(
                    (id: any) => id.toString() !== userId
                );
            } else if (type === "downVote" && comment["upVotedUsers"].includes(userId)) {
                comment.upVotes -= 1;
                comment["upVotedUsers"] = comment["upVotedUsers"].filter(
                    (id: any) => id.toString() !== userId
                );
            }

            comment[voteKey] += 1;
            comment[voteKeyUsers].push(userId);
        } else {
            comment[voteKey] -= 1;
            comment[voteKeyUsers] = comment[voteKeyUsers].filter(
                (id: any) => id.toString() !== userId
            );
        }

        await comment.save();
        const cacheKey = `${ANIMECOMMENTS}_${animeId}`;
        await deleteCacheData(cacheKey);

        return NextResponse.json(
            {
                success: true,
                message: "Vote saved succesfully",
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update the vote",
                err: error,
            },
            {
                status: 500,
            }
        );
    }
}
