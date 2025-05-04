import { Pool } from 'pg';

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});

db.on('error', (err) => {
    console.error('Unexpected error on PostgreSQL client', err);
    process.exit(-1);
});

(async () => {
    try {
        const client = await db.connect();
        console.log('Connected to PostgreSQL database');
        client.release();
    } catch (err:any) {
        console.error('Failed to connect to PostgreSQL database:', err);
        process.exit(1);
    }
})();
