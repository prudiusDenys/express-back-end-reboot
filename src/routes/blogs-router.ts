import {Request, Response, Router} from 'express';
import {blogsRepository} from '../repositories/blogs-repository/blogs-repository';
import {basicAuthMiddleware} from '../middlewares/basicAuthMiddleware';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {
  contentValidation,
  descriptionValidation,
  nameValidation,
  shortValidation,
  titleValidation,
  websiteUrlValidation
} from '../validations';
import {blogsQueryRepository} from '../repositories/blogs-repository/blogs-queryRepository';
import {blogsService} from '../domain/blogs-service';
import {BlogQueryInputModel} from '../repositories/blogs-repository/types';
import {QueryParams} from '../commonTypes/types';


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request<{}, {}, {}, BlogQueryInputModel>, res: Response) => {
  const allBlogs = await blogsQueryRepository.getAllBlogs(req.query)

  res.status(200).json(allBlogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
  const blog = await blogsQueryRepository.getBlog(req.params.id)

  if (blog) return res.status(200).json(blog)
  res.send(404)
})

blogsRouter.get('/:id/posts', async (req: Request<{ id: string }, {}, {}, QueryParams>, res: Response) => {

  const allBlogsForSpecificBlog = await blogsQueryRepository.getAllPostsForSpecificPost(req.query, req.params.id)

  if (allBlogsForSpecificBlog) return res.status(200).json(allBlogsForSpecificBlog)
  res.send(404)

})

blogsRouter.post('/',
  basicAuthMiddleware,
  nameValidation, descriptionValidation, websiteUrlValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const createdBlog = await blogsService.createBlog(req.body)

    res.status(201).json(createdBlog)
  })

blogsRouter.post('/:id/posts',
  basicAuthMiddleware,
  titleValidation, shortValidation, contentValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
  const createdPost = await blogsService.createPostForSpecificBlog(req.body, req.params.id)

  if (createdPost) return res.status(201).json(createdPost)

  res.send(404)
})

blogsRouter.put('/:id',
  basicAuthMiddleware,
  nameValidation, descriptionValidation, websiteUrlValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const isEditedBlog = await blogsRepository.editBlog(req.params.id, req.body)

    if (isEditedBlog) return res.send(204)
    res.send(404)
  })

blogsRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
  const isBlogRemoved = await blogsRepository.removeBlog(req.params.id)

  if (isBlogRemoved) return res.send(204)
  res.send(404)
})

