import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import WatchlistModel from "@/model/Watchlist";

interface requestBody {
    userId: number;
    animeId: number;
    newOption?: string;
    currentOption?: string;
    requestType: "add" | "remove";
}

interface watchlistType {
    Watching: number[];
    "On-Hold": number[];
    "Plan to watch": number[];
    Dropped: number[];
    Completed: number[];
    [key: string]: number[];
}

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const {
            userId,
            animeId,
            newOption = "",
            currentOption = "",
            requestType,
        }: requestBody = await request.json();
        if (!animeId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "anime id is undefined",
                },
                {
                    status: 404,
                }
            );
        } else if (requestType === "add" && !newOption) {
            return NextResponse.json(
                {
                    success: false,
                    message: "new option is undefined",
                },
                {
                    status: 404,
                }
            );
        } else if (requestType === "remove" && !currentOption) {
            return NextResponse.json(
                {
                    success: false,
                    message: "current option is undefined",
                },
                {
                    status: 404,
                }
            );
        }

        const watchlistDoc = await WatchlistModel.findOne({ userId });

        if (!watchlistDoc) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Watchlist not found",
                },
                {
                    status: 404,
                }
            );
        }

        const watchlistData = watchlistDoc.watchlist as watchlistType;

        if (requestType === "add") {
            watchlistData[newOption] = [...watchlistData[newOption], animeId];
        }
        if (currentOption) {
            watchlistData[currentOption] = watchlistData[currentOption].filter(
                (id) => id !== animeId
            );
        }

        watchlistDoc.watchlist = watchlistData;

        const savedWatchlist = await watchlistDoc.save();

        return NextResponse.json(
            {
                success: true,
                data: savedWatchlist.watchlist,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error while updating watchlist",
            },
            {
                status: 500,
            }
        );
    }
}
