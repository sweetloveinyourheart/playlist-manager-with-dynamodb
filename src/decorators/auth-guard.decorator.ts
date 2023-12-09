import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../configs/variables.config";

export interface AuthenticatedUser {
    email: string
    user_id: string
}

declare global {
    namespace Express {
        export interface Request {
            user?: AuthenticatedUser
        }
    }
}

/**
 * Decorator factory for implementing a basic authentication guard for an Express.js route handler method.
 * Verifies the presence and validity of a JWT (JSON Web Token) in the request headers.
 *
 * @returns A decorator function to be used on an Express route handler method.
 */
export function AuthGuard() {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        const originalMethod = propertyDescriptor.value;

        propertyDescriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (token == null) return res.sendStatus(401)

            try {
                const user = jwt.verify(token, JWT_SECRET) as any
                req.user = user
            } catch (error) {
                return res.sendStatus(401)
            }
            
            return originalMethod.apply(this, arguments);
        }

        return propertyDescriptor
    }
}