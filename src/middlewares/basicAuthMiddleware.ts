import {NextFunction, Response, Request} from 'express';
import {decodeBase64} from '../utils/decodeBase64';
import {HttpCodes} from '../http-codes/http-codes';


export const basicAuthMiddleware = (req: Request, res: Response,  next: NextFunction) => {
  const authValue = req.headers.authorization

  if (authValue) {
    const basic = authValue.split(' ')[0]

    const [login, password] = decodeBase64(authValue)

    if (basic === 'Basic' && login === 'admin' && password === 'qwerty') {
      return next()
    } else {
      res.sendStatus(HttpCodes.UNAUTHORIZED)
    }
  } else {
    res.sendStatus(HttpCodes.UNAUTHORIZED)
  }
}
