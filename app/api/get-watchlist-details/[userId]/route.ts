import dbConnect from "@/app/lib/dbConnect";
import FavouritesModel from "@/model/Favourites";
import { NextRequest, NextResponse } from "next/server";
import Bottleneck from "bottleneck";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { getAnimeDataById } from "@/app/lib/fetch";
import WatchlistModel from "@/model/Watchlist";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    await dbConnect();

    try {
        const userId = (await params).userId;
        const watchlistData: { [key: string]: number[] } =
            (await WatchlistModel.findOne({ userId }))?.watchlist || {};
        const watchlistAnimeIds = watchlistData
            ? Object.keys(watchlistData).reduce((acc: number[], option: string) => {
                    acc.push(...watchlistData[option]);
                    return acc;
                }, [])
            : [];
        let watchlistAnimesData = {};

        const limiter = new Bottleneck({ maxConcurrent: 3, minTime: 334 });

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

        if (!isDataEmptyorUndefined(watchlistAnimeIds)) {
            const result = await fetchAllAnimesData(watchlistAnimeIds);

            watchlistAnimesData = {
                ...result.reduce((acc, animeData) => {
                    acc[animeData.mal_id] = animeData;
                    return acc;
                }, {}),
            };
        }

        return NextResponse.json(
            {
                success: true,
                data: watchlistAnimesData || {},
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
