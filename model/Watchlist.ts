import mongoose, { Schema, Document } from "mongoose";

export interface Watchlist extends Document {
    userId: Schema.Types.ObjectId;
    watchlist: {
        watching: number[];
        onHold: number[];
        planToWatch: number[];
        dropped: number[];
        completed: number[];
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
            watching: {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
            onHold: {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
            planToWatch: {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
            dropped: {
                type: [Schema.Types.Number],
                default: [],
                required: true,
            },
            completed: {
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
    mongoose.model<Watchlist>("Favourites", WatchlistSchema);

export default WatchlistModel;
