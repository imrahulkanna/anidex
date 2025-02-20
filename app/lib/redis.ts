import { createClient } from "redis";

let redisInstance: ReturnType<typeof createClient> | null = null;

const getRedisInstance = async () => {
    if (!redisInstance) {
        redisInstance = createClient({
            url: "redis://redis:6379", //connecting to the redis running in a container
        });

        redisInstance.on("error", (error) => {
            console.error("Redis Error:", error);
        });

        await redisInstance.connect();
        console.log("Connected to Redis");
    }

    return redisInstance;
};

export default getRedisInstance;
