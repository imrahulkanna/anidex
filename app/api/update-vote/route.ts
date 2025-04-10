import dbConnect from "@/app/lib/dbConnect";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import CommentsModel from "@/model/Comments";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const { commentId, type } = await request.json();

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
        if (type === "upVote") {
            comment.upVotes += 1;
        } else {
            comment.downVotes -= 1;
        }

        await comment.save();

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
