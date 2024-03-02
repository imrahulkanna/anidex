import axios from "axios";
import { GET_ANIME_BY_SEARCH } from "./constants";

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
