import { db } from '../config/db';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { publishToRedis } from '../utils/redisPublisher';
import { sendApiResponse } from '../utils/common';

export const handleReceiveData = async (data: any) => {
  const id = uuidv4();
  const inserted_at = dayjs().toISOString();

  // Check if the email already exists in the database
  const emailCheckQuery = `
        SELECT COUNT(*) FROM receiver_table WHERE email = $1
    `;
  const result = await db.query(emailCheckQuery, [data.email]);

  if (parseInt(result.rows[0].count) > 0) {
    
    return { message: 'Email is already associated with another user' };
  }

  // Insert the new data if email is unique
  const query = `
        INSERT INTO receiver_table (id, "user", class, age, email, inserted_at)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
  await db.query(query, [
    id,
    data.user,
    data.class,
    data.age,
    data.email,
    inserted_at,
  ]);

  // Publish to Redis
  const payload = { id, ...data, inserted_at };
  await publishToRedis(payload);

  return { message: 'Data saved in receiver_table and published on redis' };
};

