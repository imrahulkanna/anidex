import mongoose, { Schema, Document } from "mongoose";

export interface Reply extends Document {
    userId: Schema.Types.ObjectId;
    userName: string;
    userImg: string;
    content: string;
    upVotes: number;
    downVotes: number;
    replies: Reply[];
}

export interface Comment extends Document {
    userId: Schema.Types.ObjectId;
    userName: string;
    userImg: string;
    animeId: number;
    content: string;
    upVotes: number;
    downVotes: number;
    replies: Reply[];
}

const ReplySchema: Schema<Reply> = new Schema<Reply>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        userName: {
            type: String,
            required: true,
        },
        userImg: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        upVotes: {
            type: Number,
            default: 0,
        },
        downVotes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

ReplySchema.add({ replies: { type: [ReplySchema], default: [] } });

const CommentSchema: Schema<Comment> = new Schema<Comment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        userName: {
            type: String,
            required: true,
        },
        userImg: {
            type: String,
        },
        animeId: {
            type: Number,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        upVotes: {
            type: Number,
            default: 0,
        },
        downVotes: {
            type: Number,
            default: 0,
        },
        replies: {
            type: [ReplySchema],
            default: [],
        },
    },
    { timestamps: true }
);

const CommentsModel =
    (mongoose.models.Comments as mongoose.Model<Comment>) ||
    mongoose.model<Comment>("Comments", CommentSchema);

export default CommentsModel;
