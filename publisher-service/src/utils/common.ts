import { Response } from 'express';

interface ApiResponse {
    statusCode: number;
    message: string;
    status: 'success' | 'fail' | 'error';
    data?: any;
}

export const sendApiResponse = (
    res: Response,
    { statusCode, message, status, data }: ApiResponse
): Response => {
    return res.status(statusCode).json({
        statusCode,
        status,
        message,
        ...(data !== undefined && { data }),
    });
};
