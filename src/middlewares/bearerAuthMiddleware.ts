import {Request, Response, NextFunction} from 'express';
import {jwtService} from '../application/jwt-service';
import {usersQueryRepository} from '../repositories/users-repository/users-queryRepository';
import {HttpCodes} from '../http-codes/http-codes';


export const bearerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.send(HttpCodes.UNAUTHORIZED)

  const token = req.headers.authorization.split(' ')[1]
  const userId = await jwtService.getUserIdByToken(token)

  if (userId) {
    req.user = await usersQueryRepository.findUserById(userId)
    return next()
  }
  res.send(HttpCodes.UNAUTHORIZED)
}
