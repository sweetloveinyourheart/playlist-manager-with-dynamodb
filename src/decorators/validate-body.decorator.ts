import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

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