import { GET_ANIME_BY_SEARCH, GET_TOP_ANIME } from "./constants";
import { animeData } from "../../components/TrendingAnimeList";

interface queryType {
    [key: string]: string | number;
}

const constructUrl = (baseUrl: string, queryParams: queryType) => {
    const queryString = Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join("&");
    return `${baseUrl}?${queryString}`;
};

const getUniqueAnimeData = (data: Array<animeData>) => {
    const uniqueIds = new Set();
    return data.filter((anime) => {
        if (!uniqueIds.has(anime.mal_id)) {
            uniqueIds.add(anime.mal_id);
            return true;
        }
        return false;
    });
};

export const getTrendingAnimes = async (): Promise<any> => {
    const queryParams: queryType = {
        type: "tv",
        status: "airing",
        order_by: "members",
        sort: "desc",
        limit: 10,
    };
    try {
        const url = constructUrl(GET_ANIME_BY_SEARCH, queryParams);
        const response = await fetch(url, { next: { revalidate: 3600 } });
        const apiData = await response.json();
        return apiData.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTopAiringAnimes = async (): Promise<any> => {
    const queryParams: queryType = {
        filter: "airing",
    };
    try {
        const url = constructUrl(GET_TOP_ANIME, queryParams);
        const response = await fetch(url, { next: { revalidate: 3600 } });
        const apiData = await response.json();
        return getUniqueAnimeData(apiData.data);
    } catch (error) {
        console.log(error);
    }
};

export const getMostPopularAnimes = async (): Promise<any> => {
    const queryParams: queryType = {
        filter: "bypopularity",
    };
    try {
        const url = constructUrl(GET_TOP_ANIME, queryParams);
        const response = await fetch(url, { next: { revalidate: 3600 } });
        const apiData = await response.json();
        return getUniqueAnimeData(apiData.data);
    } catch (error) {
        console.log(error);
    }
};

export const getMostFavoriteAnimes = async (): Promise<any> => {
    const queryParams: queryType = {
        filter: "favorite",
    };
    try {
        const url = constructUrl(GET_TOP_ANIME, queryParams);
        const response = await fetch(url, { next: { revalidate: 3600 } });
        const apiData = await response.json();
        return getUniqueAnimeData(apiData.data);
    } catch (error) {
        console.log(error);
    }
};

export const getLatestCompletedAnimes = async (): Promise<any> => {
    const queryParams: queryType = {
        status: "complete",
        order_by: "end_date",
        sort: "desc",
    };
    try {
        const url = constructUrl(GET_ANIME_BY_SEARCH, queryParams);
        const response = await fetch(url, { next: { revalidate: 3600 } });
        const apiData = await response.json();
        return getUniqueAnimeData(apiData.data);
    } catch (error) {
        console.log(error);
    }
};
