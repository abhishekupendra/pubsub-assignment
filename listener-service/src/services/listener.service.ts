import { db } from '../config/db';
import dayjs from 'dayjs';

export const handleIncomingData = async (data: any) => {
    const modified_at = dayjs().toISOString();

    const query = `
    INSERT INTO listener_table (id, "user", class, age, email, inserted_at, modified_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

    await db.query(query, [
        data.id,
        data.user,
        data.class,
        data.age,
        data.email,
        data.inserted_at,
        modified_at,
    ]);
};
