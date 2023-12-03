import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

/**
 * Decorator factory for validating the request body of an Express.js route handler method.
 * Uses class-validator for validation.
 *
 * @param validationClass - The class representing the validation rules to be applied to the request body.
 * @returns A decorator function to be used on an Express route handler method.
 */
export function ValidateBody(validationClass: any) {
  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      const instance = new validationClass(req.body);
      const errors = await validate(instance);

      if (errors.length > 0) {
        return res.status(400).json({ errors: errors.map((error) => error.constraints) });
      }

      return originalMethod.apply(this, arguments);
    };

    return propertyDescriptor;
  }
}