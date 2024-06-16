import React from "react";
import { getAnimeGenres } from "@/app/lib/fetch";
import AnimeGenresClient from "./AnimeGenresClient";
import { isDataEmptyorUndefined } from "@/app/lib/utils";
import { apiCallHandler } from "@/app/lib/utils";

const AnimeGenres = async () => {
    // const data = await getAnimeGenres();
    const data = await apiCallHandler(getAnimeGenres);
    return !isDataEmptyorUndefined(data) && <AnimeGenresClient genreData={data} />;
};

export default AnimeGenres;
