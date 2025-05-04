import { createClient } from 'redis';
import dotenv from 'dotenv';
import { handleIncomingData } from '../services/listener.service';

dotenv.config();

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.connect().then(() => {
    console.log('Listener connected to Redis');
    redisClient.subscribe('data_channel', async (message: any) => {
        try {
            if (!message) throw new Error("Receiver service not published any message!")
            const parsed = JSON.parse(message);
            await handleIncomingData(parsed);
            console.log('Data saved in listener_table by listener');
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });
});
