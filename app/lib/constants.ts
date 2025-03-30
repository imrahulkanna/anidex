const APIPATH: string = "https://api.jikan.moe/v4";

// api path for anime data
export const GET_ANIME_BY_SEARCH: string = `${APIPATH}/anime`;
export const GET_TOP_ANIME: string = `${APIPATH}/top/anime`;
export const GET_SEASON_UPCOMING: string = `${APIPATH}/seasons/upcoming`;
export const GET_LATEST_EPISODES: string = `${APIPATH}/watch/episodes`;
export const GET_ANIME_GENRES: string = `${APIPATH}/genres/anime`;
export const GET_SCHEDULED_RELEASES: string = `${APIPATH}/schedules`;

// timer keys
export const MINUTE = 60;
export const HOUR = 3600;
export const DAY = 86400;

// redis keys
export const ANIME = "ANIME";
export const PROMOTIONALVIDEOS = "PROMOTIONALVIDEOS";
export const ANIMECHARACTERS = "ANIMECHARACTERS";