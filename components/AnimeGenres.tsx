import React from "react";
import { getAnimeGenres } from "@/app/lib/fetch";
import AnimeGenresClient from "./AnimeGenresClient";
import { isDataEmptyorUndefined } from "@/app/lib/utils";

const AnimeGenres = async () => {
    const data = await getAnimeGenres();
    return !isDataEmptyorUndefined(data) && <AnimeGenresClient genreData={data} />;
};

export default AnimeGenres;
