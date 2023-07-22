import {Request, Response, Router} from 'express';
import {bearerAuthMiddleware} from '../middlewares/bearerAuthMiddleware';
import {contentValidation} from '../validations';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {commentsService} from '../domain/comments-service';
import {HttpCodes} from '../http-codes/http-codes';
import {commentsQueryRepository} from '../repositories/comments-repository/comments-queryRepository';


export const commentsRouter = Router({})

commentsRouter.get('/:id', async (req: Request, res: Response) => {
  const comment = await commentsQueryRepository.findCommentById(req.params.id)

  if (comment) return res.status(HttpCodes.SUCCESSFUL).json(comment)

  res.send(HttpCodes.NOT_FOUND)
})

commentsRouter.put('/:id',
  bearerAuthMiddleware,
  contentValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const result = await commentsService.editComment(req.params.id, req.body.content, req.user!.id)

    if (result === HttpCodes.NO_CONTENT) return res.send(HttpCodes.NO_CONTENT)
    if (result === HttpCodes.FORBIDDEN) return res.send(HttpCodes.FORBIDDEN)
    res.send(HttpCodes.NOT_FOUND)
  })

commentsRouter.delete('/:id',
  bearerAuthMiddleware,
  async (req: Request, res: Response) => {
    const result = await commentsService.removeComment(req.params.id, req.user!.id)

    if (result === HttpCodes.NO_CONTENT) return res.send(HttpCodes.NO_CONTENT)
    if (result === HttpCodes.FORBIDDEN) return res.send(HttpCodes.FORBIDDEN)
    res.send(HttpCodes.NOT_FOUND)
  })
