import { Request, Response } from 'express';
import { handleReceiveData } from '../services/publisher.service';
import { sendApiResponse } from '../utils/common';

export const receiveData = async (req: Request, res: Response) => {
    try {
        const result = await handleReceiveData(req.body);
        sendApiResponse(res, {
            statusCode: 200,
            message: '',
            status: 'success',
            data: result,
        });

    } catch (err) {
        console.error(err);
        sendApiResponse(res, {
            statusCode: 500,
            message: '',
            status: 'fail',
            data: err,
        });

    }
};
