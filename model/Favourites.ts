import mongoose, { Schema, Document } from "mongoose";

export interface Favourites extends Document {
    userId: Schema.Types.ObjectId;
    animeIds: number[];
    createdAt: Date;
    updatedAt: Date;
}

const FavouritesSchema: Schema<Favourites> = new Schema<Favourites>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User", // Reference to the User collection
            unique: true,
        },
        animeIds: {
            type: [Schema.Types.Number],
            default: [],
            required: true,
        },
    },
    { timestamps: true }
);

const FavouritesModel =
    (mongoose.models.Favourites as mongoose.Model<Favourites>) ||
    mongoose.model<Favourites>("Favourites", FavouritesSchema);

export default FavouritesModel;
