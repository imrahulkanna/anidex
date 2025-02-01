import dbConnect from "@/app/lib/dbConnect";
import FavouritesModel from "@/model/Favourites";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { userId, animeId, requestType } = await request.json();

        if (!userId || !animeId || !["add", "remove"].includes(requestType)) {
            return NextResponse.json(
                { success: false, message: "Invalid request parameters" },
                { status: 400 }
            );
        }

        if (requestType === "add") {
            const result = await FavouritesModel.updateOne(
                { userId: userId },
                { $addToSet: { animeIds: animeId } }, // Prevent duplicates
                { upsert: true } // Create a new document if it doesn't exist
            );

            if (result.matchedCount === 0 && result.upsertedCount === 0) {
                return NextResponse.json(
                    { success: false, message: "Failed to add to favourites" },
                    { status: 400 }
                );
            }
        } else {
            const result = await FavouritesModel.updateOne(
                { userId: userId },
                { $pull: { animeIds: animeId } }
            );

            if (result.matchedCount === 0) {
                return NextResponse.json(
                    { success: false, message: "Failed to remove from favourites" },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { success: true, message: "Favourites updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error in updating favourites",
            },
            {
                status: 400,
            }
        );
    }
}
