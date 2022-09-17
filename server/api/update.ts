import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL);

export default defineEventHandler(async (event) => {
    if(event.req.method !== "POST") return event.res.statusCode = 405;

    const { name, timestamp, secret } = await useBody(event);

    if(secret !== process.env.SECRET) return event.res.statusCode = 401;

    await redis.set("plexit-ldv-name", name);
    await redis.set("plexit-ldv-timestamp", timestamp);

    return event.res.statusCode = 200;
})