import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect();

export const publishToRedis = async (data: any) => {
    await redisClient.publish('data_channel', JSON.stringify(data));
    console.log('Data saved in receiver_table and message passed to redis');
};
