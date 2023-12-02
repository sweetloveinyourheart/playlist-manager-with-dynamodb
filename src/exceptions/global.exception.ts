import { NextFunction, Request, Response } from "express";

export class Exception extends Error {
    statusCode?: number

    constructor(message?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export function GlobalException(err: Exception, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Exception) {
        if (!err.statusCode) {
            return res.status(500).json({ message: 'Internal server error', statusCode: 500 })
        }

        // Handle the custom exception by returning a JSON response with the error message and status code
        return res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
    } else {
        // Pass the error to the next error handling middleware
        return next(err);
    }
}