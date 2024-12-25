import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import FavouritesModel from "@/model/Favourites";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { userId } = await request.json();
        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID is required",
                },
                { status: 400 }
            );
        }
        const userData: any = { id: userId };

        const userFavourites = await FavouritesModel.findOne({ userId: userId });
        userData.favourites = userFavourites?.animeIds || [];

        return NextResponse.json(
            {
                success: true,
                data: userData,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching user details",
                error: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
