import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsMessages = errors.array().map((error: any) => {
      return {
        message: `${error.path} is incorrect`,
        field: error.path
      }
    })
    return res.status(400).json({errorsMessages})
  }
  next()
}
