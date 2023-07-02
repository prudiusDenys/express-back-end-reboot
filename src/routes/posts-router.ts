import {Request, Response, Router} from 'express';
import {postsRepository} from '../repositories/posts-repository';
import {basicAuthMiddleware} from '../middlewares/basicAuthMiddleware';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {blogIdValidation, contentValidation, shortValidation, titleValidation} from '../validations';


export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
  const allPosts = postsRepository.getAllPosts()

  res.status(200).json(allPosts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
  const post = postsRepository.getPost(req.params.id)

  if (post) return res.status(200).json(post)
  res.send(404)
})

postsRouter.post('/',
  basicAuthMiddleware,
  titleValidation, shortValidation, contentValidation, blogIdValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const createdPost = postsRepository.createPost(req.body)

    if (createdPost) return res.status(201).json(createdPost)
    res.send(404)
  })

postsRouter.put('/:id',
  basicAuthMiddleware,
  titleValidation, shortValidation, contentValidation, blogIdValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const isEditedPost = postsRepository.editPost(req.params.id, req.body)

    if (isEditedPost) return res.send(204)
    res.send(404)
  })

postsRouter.delete('/:id', basicAuthMiddleware, (req: Request, res: Response) => {
  const isPostRemoved = postsRepository.removePost(req.params.id)

  if (isPostRemoved) return res.send(204)
  res.send(404)
})
