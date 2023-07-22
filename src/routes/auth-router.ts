import {Response, Request, Router} from 'express';
import {loginOrEmailValidation, passwordValidation} from '../validations';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {authService} from '../domain/auth-service';
import {jwtService} from '../application/jwt-service';
import {bearerAuthMiddleware} from '../middlewares/bearerAuthMiddleware';
import {usersQueryRepository} from '../repositories/users-repository/users-queryRepository';
import {HttpCodes} from '../http-codes/http-codes';


export const authRouter = Router({})

authRouter.post('/login',
  loginOrEmailValidation, passwordValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body

    const user = await authService.checkCredentials(loginOrEmail, password)

    if (user) {
      const accessToken = await jwtService.createJWT(user)
      return res.status(200).json(accessToken)
    }

    res.send(HttpCodes.UNAUTHORIZED)
  })

authRouter.get('/me',
  bearerAuthMiddleware,
  async (req: Request, res: Response) => {
    const user = await usersQueryRepository.findUserById(req.user!.id)

    res.status(HttpCodes.SUCCESSFUL).json({
      email: user!.email,
      login: user!.login,
      userId: user!.id
    })
  })
