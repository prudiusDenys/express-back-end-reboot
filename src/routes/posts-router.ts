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


export const postsRouter = Router({})

postsRouter.get('/', async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  const allPosts = await postsQueryRepository.getAllPosts(req.query)

  res.status(200).json(allPosts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
  const post = await postsQueryRepository.getPost(req.params.id)

  if (post) return res.status(200).json(post)
  res.send(404)
})

postsRouter.post('/',
  basicAuthMiddleware,
  titleValidation, shortValidation, contentValidation, blogIdValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const createdPost = await postsService.createPost(req.body)

    res.status(201).json(createdPost)
  })

postsRouter.put('/:id',
  basicAuthMiddleware,
  titleValidation, shortValidation, contentValidation, blogIdValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const isEditedPost = await postsRepository.editPost(req.params.id, req.body)

    if (isEditedPost) return res.send(204)
    res.send(404)
  })

postsRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
  const isPostRemoved = await postsRepository.removePost(req.params.id)

  if (isPostRemoved) return res.send(204)
  res.send(404)
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

    if (createdComment) return res.status(201).json(createdComment)

    res.send(404)
  })
