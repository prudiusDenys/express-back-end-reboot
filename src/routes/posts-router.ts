import {Request, Response, Router} from 'express';
import {postsRepository} from '../repositories/posts-repository/posts-repository';
import {basicAuthMiddleware} from '../middlewares/basicAuthMiddleware';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {
  blogIdValidation,
  CommentContentValidation,
  contentValidation,
  shortValidation,
  titleValidation
} from '../validations';
import {postsQueryRepository} from '../repositories/posts-repository/posts-queryRepository';
import {postsService} from '../domain/posts-service';
import {QueryParams} from '../commonTypes/types';
import {bearerAuthMiddleware} from '../middlewares/bearerAuthMiddleware';
import {normalizeComment} from '../utils/normalizeData';
import {commentsQueryRepository} from '../repositories/comments-repository/comments-queryRepository';
import {HttpCodes} from '../http-codes/http-codes';


export const postsRouter = Router({})

postsRouter.get('/', async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  const allPosts = await postsQueryRepository.getAllPosts(req.query)

  res.status(HttpCodes.SUCCESSFUL).json(allPosts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
  const post = await postsQueryRepository.getPost(req.params.id)

  if (post) return res.status(HttpCodes.SUCCESSFUL).json(post)
  res.send(HttpCodes.NOT_FOUND)
})

postsRouter.post('/',
  basicAuthMiddleware,
  titleValidation, shortValidation, contentValidation, blogIdValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const createdPost = await postsService.createPost(req.body)

    res.status(HttpCodes.CREATED).json(createdPost)
  })

postsRouter.put('/:id',
  basicAuthMiddleware,
  titleValidation, shortValidation, contentValidation, blogIdValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const isEditedPost = await postsRepository.editPost(req.params.id, req.body)

    if (isEditedPost) return res.send(HttpCodes.NO_CONTENT)
    res.send(HttpCodes.NOT_FOUND)
  })

postsRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
  const isPostRemoved = await postsRepository.removePost(req.params.id)

  if (isPostRemoved) return res.send(HttpCodes.NO_CONTENT)
  res.send(HttpCodes.NOT_FOUND)
})

//Comments Part

postsRouter.post('/:postId/comments',
  bearerAuthMiddleware,
  CommentContentValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const createdComment = await postsService.createComment(
      req.params.postId,
      req.body.content,
      req.user!.id,
      req.user!.login
    )

    if (createdComment) {
      const normalizedComment = normalizeComment(createdComment)
      return res.status(HttpCodes.CREATED).json(normalizedComment)
    }

    res.send(HttpCodes.NOT_FOUND)
  })

postsRouter.get('/:postId/comments',
  async (req: Request<{postId: string}, {}, {}, QueryParams>, res: Response) => {
    const allCommentsForSpecificPost = await commentsQueryRepository.getAllCommentsForSpecificPost(req.query, req.params.postId)

    if (allCommentsForSpecificPost) return res.status(HttpCodes.SUCCESSFUL).json(allCommentsForSpecificPost)
    res.send(HttpCodes.NOT_FOUND)
  })
