import dbConnect from "@/app/lib/dbConnect";
import FavouritesModel from "@/model/Favourites";
import { NextRequest, NextResponse } from "next/server";
import Bottleneck from "bottleneck";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { getAnimeDataById } from "@/app/lib/fetch";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    await dbConnect();

    try {
        const userId = (await params).userId;
        const favouritesData = await FavouritesModel.findOne({ userId });
        const favAnimeIds = favouritesData?.animeIds || [];

        const limiter = new Bottleneck({ maxConcurrent: 3, minTime: 334 });
        const favAnimeData = [];

        const fetchAnimeData = async (animeId: number) => {
            const data = await getAnimeDataById(animeId);
            return data;
        };

        const fetchAllAnimesData = async (animeIds: number[]) => {
            const allData = animeIds.map((id) => {
                return limiter.schedule(() => fetchAnimeData(id));
            });
            return Promise.all(allData);
        };

        if (!isDataEmptyorUndefined(favAnimeIds)) {
            const result = await fetchAllAnimesData(favAnimeIds);
            favAnimeData.push(...result);
        }

        return NextResponse.json(
            {
                success: true,
                data: favAnimeData || [],
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("failing", error);
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching watchlist details",
                error: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
