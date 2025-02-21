import React from "react";
import { getAnimeGenres } from "@/app/lib/fetch";
import AnimeGenresClient from "./AnimeGenresClient";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { apiCallHandler } from "@/app/lib/server-utils";
import { DAY } from "@/app/lib/constants";

const AnimeGenres = async () => {
    // const data = await getAnimeGenres();
    const data = await apiCallHandler(getAnimeGenres, "ANIMEGENRES", 30 * DAY);
    return !isDataEmptyorUndefined(data) && <AnimeGenresClient genreData={data} />;
};

export default AnimeGenres;
