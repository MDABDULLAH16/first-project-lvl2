import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validatedRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //validation checking
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default validatedRequest;
