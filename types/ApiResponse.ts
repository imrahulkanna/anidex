export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
}

export interface imageType {
    image_url: string;
    large_image_url: string;
    maximum_image_url?: string;
}
export interface genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface streamingPartner {
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
    streaming?: streamingPartner[];
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

export type WatchlistOption = "Watching" | "On-Hold" | "Plan to watch" | "Dropped" | "Completed";

export interface character {
    character: {
        mal_id: number;
        name: string;
        images: {
            webp: imageType;
            jpg?: imageType;
        };
    };
    role: string;
    voice_actors: any;
}

export interface promoVideos {
    title: string;
    trailer: {
        embed_url: string;
        images: imageType;
    }
}
