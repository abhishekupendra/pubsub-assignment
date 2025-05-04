import express from 'express';
import dotenv from 'dotenv';
import receiverRoutes from './routes/publisher.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/receiver', receiverRoutes);

export default app;
