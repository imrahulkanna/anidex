export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
}

export interface imageType {
    image_url: string;
    large_image_url: string;
}
export interface genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface animeData {
    mal_id: number | null;
    title_english: string | null;
    title: string;
    images: {
        webp: imageType;
        jpg?: imageType;
    };
    type: string;
    episodes: number;
    aired: {
        from: string | null;
        string: string;
    };
    duration?: string;
    broadcast: {
        time: string;
    };
    score: number;
    synopsis: string;
    title_japanese: string;
    title_synonyms: string[];
    status: string;
    genres: genre[];
}

export interface latestEps {
    entry: {
        mal_id: number;
        title: string;
        images: {
            webp: imageType;
            jpg?: imageType;
        };
    };
    episodes: [
        {
            title: string;
        }
    ];
}
