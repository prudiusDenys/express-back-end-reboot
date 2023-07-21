import {Response, Request, Router} from 'express';
import {usersQueryRepository} from '../repositories/users-repository/users-queryRepository';
import {usersService} from '../domain/users-service';
import {usersRepository} from '../repositories/users-repository/users-repository';
import {basicAuthMiddleware} from '../middlewares/basicAuthMiddleware';
import {emailValidation, loginValidation, passwordValidation} from '../validations';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {normalizeUser} from '../utils/normalizeData';


export const usersRouter = Router({})

usersRouter.get('/',
  basicAuthMiddleware,
  async (req: Request<{}, {}, {}, any>, res: Response) => {
    const allUsers = await usersQueryRepository.getAllUsers(req.query)

    res.status(200).json(allUsers)
  })

usersRouter.post('/',
  basicAuthMiddleware,
  loginValidation, passwordValidation, emailValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const createdUser = await usersService.createUser(req.body)

    const normalizedUser = normalizeUser(createdUser)

    res.status(201).json(normalizedUser)
  })

usersRouter.delete('/:id',
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const isUserRemoved = await usersRepository.removeUser(req.params.id)

    if (isUserRemoved) return res.send(204)
    res.send(404)
  })
