import {Response, Request, Router} from 'express';
import {loginOrEmailValidation, passwordValidation} from '../validations';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {authService} from '../domain/auth-service';


export const authRouter = Router({})

authRouter.post('/login',
  loginOrEmailValidation, passwordValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body

    const isUser = await authService.checkCredentials(loginOrEmail, password)

    if (isUser) return res.send(204)

    res.send(401)
  })
