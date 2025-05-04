import { Request, Response, NextFunction } from 'express';
import { isValidEmail } from '../utils/common';

export const validateBody = (req: Request, res: Response, next: NextFunction) => {
    const { user, class: className, age, email } = req.body;

    const missingFields = [];
    if (!user) missingFields.push('user');
    if (!className) missingFields.push('class');
    if (!age && age !== 0) missingFields.push('age');
    if (!email) missingFields.push('email');

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required field(s): ${missingFields.join(', ')}` });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (typeof age !== 'number') {
        return res.status(400).json({ error: 'Age must be a number' });
    }

    next();
};

