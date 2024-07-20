import RateLimiter from "./apiQueue/rateLimiter.js";

const rateLimiter = new RateLimiter(3, 1000); // 3 request per second

export function isDataEmptyorUndefined<T>(data: T | undefined | null): data is undefined | null {
    return (
        data === undefined ||
        data === null ||
        data === "" ||
        Number.isNaN(data) ||
        false ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === "object" && data !== null && Object.keys(data).length === 0)
    );
}

export const addToQueue = async (func: (...args: any[]) => Promise<any>, ...args: any[]) => {
    // console.log("inside addToQueue");
    try {
        const res = await rateLimiter.addJob(() => func(...args));
        return res;
    } catch (error) {
        console.log("Error while adding to queue:", error);
    }
};

export const apiCallHandler = async (func: (...args: any[]) => Promise<any>, ...args: any[]) => {
    // console.log("inside apiCallHandler");
    try {
        const response = await addToQueue(func, ...args);
        return response;
    } catch (error) {
        console.log("Error while queuing:", error);
    }
};
