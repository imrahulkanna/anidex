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
    upVotedUsers: Array<Schema.Types.ObjectId | String>;
    downVotedUsers: Array<Schema.Types.ObjectId | String>;
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
        upVotedUsers: {
            type: [Schema.Types.ObjectId],
            default: [],
        },
        downVotedUsers: {
            type: [Schema.Types.ObjectId],
            default: [],
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
