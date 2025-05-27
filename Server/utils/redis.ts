import { Redis } from "ioredis";
require('dotenv').config();

const redisClient = () =>{
    if(process.env.REDIS_URL){
        console.log('REDIS CONNECTED')
        return process.env.REDIS_URL;
    }
    throw new Error ('REDIS not CONNECTED')
}

export const redis = new Redis(redisClient());

// import { Redis } from "@upstash/redis";
// import dotenv from "dotenv";

// dotenv.config();

// let redis: Redis;

// try {
//   const url = process.env.UPSTASH_REDIS_REST_URL;
//   const token = process.env.UPSTASH_REDIS_REST_TOKEN;

//   if (!url || !token) {
//     throw new Error("Upstash Redis URL or token is missing in .env");
//   }

//   redis = new Redis({ url, token });

//   // Optional: test the connection on startup
//   redis.ping()
//     .then((res) => {
//       if (res === "PONG") {
//         console.log("✅ REDIS CONNECTED (Upstash)");
//       } else {
//         console.warn("⚠️ REDIS responded but not with PONG:", res);
//       }
//     })
//     .catch((err) => {
//       console.error("❌ Failed to connect to REDIS:", err.message);
//     });

// } catch (err: any) {
//   console.error("❌ REDIS INIT ERROR:", err.message);
//   process.exit(1); // stop the server if Redis is critical
// }

// export { redis };
