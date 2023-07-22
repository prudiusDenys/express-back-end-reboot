import {Request, Response, NextFunction} from 'express';
import {jwtService} from '../application/jwt-service';
import {usersQueryRepository} from '../repositories/users-repository/users-queryRepository';
import {HttpCodes} from '../http-codes/http-codes';


export const bearerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.send(HttpCodes.UNAUTHORIZED)

  const token = req.headers.authorization.split(' ')[1]
  const result = await jwtService.getUserIdByToken(token)

  if (result) {
    req.user = await usersQueryRepository.findUserById(result.accessToken)
    next()
  }
  res.send(HttpCodes.UNAUTHORIZED)
}
