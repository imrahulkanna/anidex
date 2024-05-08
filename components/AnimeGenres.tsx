import React from "react";
import { getAnimeGenres } from "@/app/lib/fetch";
import AnimeGenresClient from "./AnimeGenresClient";

const AnimeGenres = async () => {
    const data = await getAnimeGenres();
    return <AnimeGenresClient genreData={data} />;
};

export default AnimeGenres;
