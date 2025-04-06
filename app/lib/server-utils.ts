import RateLimiter from "./apiQueue/rateLimiter";
import getRedisInstance from "./redis";
import { isDataEmptyorUndefined } from "./utils";

const rateLimiter = new RateLimiter(3, 1000); // 3 request per second

export const addToQueue = async (func: (...args: any[]) => Promise<any>, ...args: any[]) => {
    // console.log("inside addToQueue");
    try {
        const res = await rateLimiter.addJob(() => func(...args));
        return res;
    } catch (error) {
        console.log("Error while adding to queue:", error);
    }
};

export const apiCallHandler = async (
    func: (...args: any[]) => Promise<any>,
    cacheKey: string,
    cacheTime: number,
    ...args: any[]
) => {
    try {
        let response = await getCacheData(cacheKey);
        if (isDataEmptyorUndefined(response)) {
            const data = await addToQueue(func, ...args);
            response = await data;
            await setCacheData(cacheKey, cacheTime, response);
        }
        return response ?? [];
    } catch (error) {
        console.log("Error while queuing:", error);
    }
};

export const getCacheData = async (cacheKey: string) => {
    const redis = await getRedisInstance();
    if (!redis) return null;

    const cacheData = await redis.get(cacheKey);
    return cacheData ? JSON.parse(cacheData) : null;
};

export const setCacheData = async (cacheKey: string, cacheTime: number, data: any) => {
    const redis = await getRedisInstance();
    if (!redis) return null;

    redis.setEx(cacheKey, cacheTime, JSON.stringify(data));
};

export const deleteCacheData = async (cacheKey: string) => {
    const redis = await getRedisInstance();
    if (!redis) return null;

    await redis.del(cacheKey);
};
