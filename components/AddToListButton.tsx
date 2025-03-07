"use client"
import React, {useEffect, useState} from "react";
import {useLoginModal} from "@/context/LoginModalContext";
import {useUserData} from "@/context/UserDataContext";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {CheckIcon} from "@heroicons/react/24/outline";
import {animeData, WatchlistOption} from "@/types/ApiResponse";
import {isDataEmptyorUndefined} from "@/app/lib/utils";

interface Props {
    anime: animeData;
    dropDownPositionStyle: string;
    btnStyle?: string;
    btnWidth: string;
}

const AddToListButton = ({anime, dropDownPositionStyle, btnStyle, btnWidth}: Props) => {
    const { data: session } = useSession();
    const { userData, setUserData } = useUserData();
    const { setOpenLoginModal } = useLoginModal();

    const defaultWatchlistOptions = {
        Watching: { selected: false },
        "On-Hold": { selected: false },
        "Plan to watch": { selected: false },
        Dropped: { selected: false },
        Completed: { selected: false },
    };
    const [openWatchlist, setOpenWatchlist] = useState<boolean>(false);
    const [watchlistOptions, setWatchlistOptions] = useState(defaultWatchlistOptions);

    useEffect(() => {
        if (!userData) return;

        const defaultOption = Object.entries(userData.watchlist).find(([_, animesArr]) => {
            return (animesArr as number[]).includes(anime?.mal_id as number);
        })?.[0];

        if (defaultOption) {
            setWatchlistOptions({
                ...defaultWatchlistOptions,
                [defaultOption]: { selected: true },
            });
        }
    }, [userData, anime])

    const toggleWatchlist = () => setOpenWatchlist(!openWatchlist);

    const handleOptionSelection = async (selectedOption: WatchlistOption) => {
        if (isDataEmptyorUndefined(session)) {
            setOpenLoginModal(true);
            return;
        }

        try {
            const currentOption =
                Object.entries(watchlistOptions).find(([_, option]) => option.selected)?.[0] ||
                "";
            const newOption = selectedOption === currentOption ? "" : selectedOption;
            const requestBody = {
                userId: userData?._id,
                animeId: anime?.mal_id,
                newOption,
                currentOption,
                requestType: watchlistOptions[selectedOption].selected ? "remove" : "add",
            };

            const result = await fetch("/api/update-watchlist", {
                method: "POST",
                cache: "no-cache",
                body: JSON.stringify(requestBody),
            });

            const response = await result.json();
            setUserData((prevState: any) => {
                return {
                    ...prevState,
                    watchlist: response.data,
                };
            });

            setWatchlistOptions((prevState) => {
                return {
                    ...defaultWatchlistOptions,
                    [selectedOption]: { selected: !prevState[selectedOption].selected },
                };
            });
        } catch (error) {
            console.log("update watchlist failed: ", error);
        }

        setOpenWatchlist(false);
    };

    return (
        <div className={`relative ${btnWidth}`}>
            <Button
                className={`w-full rounded-full font-semibold flex gap-2 items-center justify-center ${btnStyle}`}
                variant="secondary"
                onClick={toggleWatchlist}
            >
                {Object.entries(watchlistOptions).find(
                    ([_, option]) => option.selected
                )?.[0] || "Add to watchlist"}
            </Button>
            {openWatchlist && (
                <ul className={`w-[90%] absolute ${dropDownPositionStyle}-[110%] left-1/2 -translate-x-1/2 rounded-md bg-neutral-200 text-neutral-900`}>
                    {Object.entries(watchlistOptions).map(([name, option]) => (
                        <li
                            key={name}
                            className="w-full text-center font-medium py-1 pt-2 hover:bg-neutral-300 cursor-pointer first:hover:rounded-t-md last:hover:rounded-b-md"
                        >
                            <p
                                className="flex justify-center items-baseline gap-1"
                                onClick={() => handleOptionSelection(name as WatchlistOption)}
                            >
                                {name}{" "}
                                {option.selected && (
                                    <CheckIcon className="w-3 stroke-[4]" />
                                )}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AddToListButton;