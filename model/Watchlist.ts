import mongoose, { Schema, Document } from "mongoose";

export interface Watchlist extends Document {
    userId: Schema.Types.ObjectId;
    watchlist: {
        Watching: number[];
        "On-Hold": number[];
        "Plan to watch": number[];
        Dropped: number[];
        Completed: number[];
    };
    createdAt: Date;
    updatedAt: Date;
}
const WatchlistSchema: Schema = new Schema<Watchlist>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User", // Reference to the User collection
            unique: true,
        },
        watchlist: {
            Watching: {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
            "On-Hold": {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
            "Plan to watch": {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
            Dropped: {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
            Completed: {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
        },
    },
    { timestamps: true }
);

const WatchlistModel =
    (mongoose.models.Watchlist as mongoose.Model<Watchlist>) ||
    mongoose.model<Watchlist>("Watchlist", WatchlistSchema);

export default WatchlistModel;
