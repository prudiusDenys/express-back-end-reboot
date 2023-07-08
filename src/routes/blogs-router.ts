import {Request, Response, Router} from 'express';
import {blogsRepository} from '../repositories/blogs-repository/blogs-repository';
import {basicAuthMiddleware} from '../middlewares/basicAuthMiddleware';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {descriptionValidation, nameValidation, websiteUrlValidation} from '../validations';
import {blogsQueryRepository} from '../repositories/blogs-repository/blogs-queryRepository';
import {blogsService} from '../domain/blogs-service';


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
  const allBlogs = await blogsQueryRepository.getAllBlogs()

  res.status(200).json(allBlogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
  const blog = await blogsQueryRepository.getBlog(req.params.id)

  if (blog) return res.status(200).json(blog)
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

