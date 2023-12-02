import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../configs/variables.config";

interface AuthenticatedUser {
    username: string
    user_id: string
}

declare global {
    namespace Express {
        export interface Request {
            user?: AuthenticatedUser
        }
    }
}

export function AuthGuard() {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        const originalMethod = propertyDescriptor.value;

        propertyDescriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (token == null) return res.sendStatus(401)

            jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
                if (err) return res.sendStatus(403)

                req.user = user
            })

            return originalMethod.apply(this, arguments);
        }

        return propertyDescriptor
    }
}