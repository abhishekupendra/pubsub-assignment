import { Router } from 'express';
import { receiveData } from '../controllers/publisher.controller';
import { validateBody } from '../middleware/validateBody';

const router = Router();

router.post('/', validateBody, receiveData);

export default router;
