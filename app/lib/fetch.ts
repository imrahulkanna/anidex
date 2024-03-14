import axios from "axios";
import { GET_ANIME_BY_SEARCH, GET_TOP_ANIME } from "./constants";

export const getTrendingAnimes = async (): Promise<any> => {
    const queryParams: object = {
        type: "tv",
        status: "airing",
        order_by: "members",
        sort: "desc",
        limit: 10,
    };
    try {
        const response = await axios.get(GET_ANIME_BY_SEARCH, { params: queryParams });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTopAiringAnimes = async (): Promise<any> => {
    const queryParams: object = {
        filter: "airing",
    };
    try {
        const response = await axios.get(GET_TOP_ANIME, { params: queryParams });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getMostPopularAnimes = async (): Promise<any> => {
    const queryParams: object = {
        filter: "bypopularity",
    };
    try {
        const response = await axios.get(GET_TOP_ANIME, { params: queryParams });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getMostFavoriteAnimes = async (): Promise<any> => {
    const queryParams: object = {
        filter: "favorite",
    };
    try {
        const response = await axios.get(GET_TOP_ANIME, { params: queryParams });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};
