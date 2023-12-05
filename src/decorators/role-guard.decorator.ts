import { NextFunction, Request, Response } from "express";
import { Role } from "../models/account.model";
import UserService from "../services/user.service";

const userService = new UserService()

/**
 * Decorator function that creates a role-based access guard for a method.
 *
 * @param {...Role} roles - The roles allowed to access the decorated method.
 * @returns {Function} - A decorator function to be applied to a method.
 *
 * @decorator
 * @example
 * class SomeClass {
 *   @RolesGuard('Admin', 'Manager')
 *   someMethod(req, res, next) {
 *     // Your method logic here
 *   }
 * }
 */
export function RolesGuard(...roles: Role[]): Function {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        const originalMethod = propertyDescriptor.value;

        propertyDescriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const user = req.user
            if (!user) return res.sendStatus(401)

            const account = await userService.getUserAccountByEmail(user.email)

            const hasPermission = roles.includes(account.role)
            if (!hasPermission) return res.sendStatus(403)

            return originalMethod.apply(this, arguments);
        }

        return propertyDescriptor
    }
}