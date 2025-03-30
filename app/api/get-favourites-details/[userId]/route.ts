import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import FavouritesModel from "@/model/Favourites";
import Bottleneck from "bottleneck";
import { getAnimeDataById } from "@/app/lib/fetch";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { getCacheData, setCacheData } from "@/app/lib/server-utils";
import { animeData } from "@/types/ApiResponse";
import { DAY } from "@/app/lib/constants";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    await dbConnect();

    try {
        const userId = params.userId;

        if (isDataEmptyorUndefined(userId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "userId is invalid",
                },
                { status: 400 }
            );
        }

        const favAnimeIds = (await FavouritesModel.findOne({ userId }))?.animeIds || [];
        const favAnimesData = [];

        const cacheKey = `FAVOURITES_${userId}`;
        const cacheData = await getCacheData(cacheKey);
        const cacheAnimeIds: number[] = cacheData
            ? cacheData.map((animeData: animeData) => animeData.mal_id)
            : [];

        if (
            cacheAnimeIds.length === favAnimeIds.length &&
            JSON.stringify(cacheAnimeIds.sort()) === JSON.stringify(favAnimeIds.sort())
        ) {
            return NextResponse.json(
                {
                    success: true,
                    data: cacheData,
                },
                { status: 200 }
            );
        }

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

        if (!isDataEmptyorUndefined(favAnimeIds)) {
            const result = await fetchAllAnimesData(favAnimeIds);
            favAnimesData.push(...result);
            await setCacheData(cacheKey, 10 * DAY, favAnimesData);
        }

        return NextResponse.json(
            {
                success: true,
                data: favAnimesData,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failing to fetch favourite anime details",
            },
            { status: 500 }
        );
    }
}
