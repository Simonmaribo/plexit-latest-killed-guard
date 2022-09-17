import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL);

export default defineEventHandler(async (event) => {

    const name = await redis.get("plexit-ldv-name");
    const timestamp = await redis.get("plexit-ldv-timestamp");

    event.res.setHeader("Content-Type", "application/json");
    event.res.setHeader("Access-Control-Allow-Origin", "*");
    event.res.setHeader("Cache-Control", "max-age=60, public");


    return {
        name,
        timestamp
    }
})