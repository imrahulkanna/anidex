import mongoose, { Schema, Document } from "mongoose";

export interface Comment extends Document {
    userId: Schema.Types.ObjectId;
    userName: string;
    userImg: string;
    animeId: number;
    content: string;
    upVotes: number;
    downVotes: number;
    replies: Comment[];
    parentId: Schema.Types.ObjectId | null;
    createdAt: String;
    updatedAt: String;
}

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
        parentId: {
            type: Schema.Types.ObjectId,
            default: null,
        },
    },
    { timestamps: true }
);

CommentSchema.add({
    replies: {
        type: [CommentSchema],
        default: [],
    },
});

const CommentsModel =
    (mongoose.models.Comments as mongoose.Model<Comment>) ||
    mongoose.model<Comment>("Comments", CommentSchema);

export default CommentsModel;
