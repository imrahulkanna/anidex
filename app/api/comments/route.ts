import dbConnect from "@/app/lib/dbConnect";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import CommentsModel, { Comment } from "@/model/Comments";
import { NextResponse, NextRequest } from "next/server";
import { comment } from "postcss";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const data = await request.json();

        if (isDataEmptyorUndefined(data.animeId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "anime id is empty",
                },
                {
                    status: 500,
                }
            );
        } else if (isDataEmptyorUndefined(data.userId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "user id is empty",
                },
                {
                    status: 500,
                }
            );
        }

        const newComment = new CommentsModel({
            userId: data.userId,
            userName: data.userName,
            userImg: data.userImg,
            animeId: data.animeId,
            content: data.content,
            parentId: data.parentId || null,
        });

        await newComment.save();

        return NextResponse.json(
            { success: true, message: "Comment successfully added" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error saving a comment",
                err: error,
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const searchParams = request.nextUrl.searchParams;
        const animeId = searchParams.get("animeId");        
        const allComments = await CommentsModel.find({ animeId }).lean().exec();        
        const commentsMap = new Map();
        const rootComments: Comment[] = [];

        allComments.forEach((comment) => commentsMap.set(comment._id.toString(), comment));        
        allComments.forEach((comment) => {
            if (comment.parentId) {                
                commentsMap.get(comment.parentId.toString())?.replies.push(comment);                
            } else {                
                rootComments.push(comment);
            }
        });

        return NextResponse.json({ success: true, data: rootComments }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error while fetching comments",
                err: error
            },
            {
                status: 500,
            }
        );
    }
}
