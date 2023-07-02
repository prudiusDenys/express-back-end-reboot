import {Request, Response, Router} from 'express';
import {blogsRepository} from '../repositories/blogs-repository';
import {basicAuthMiddleware} from '../middlewares/basicAuthMiddleware';
import {inputValidationMiddleware} from '../middlewares/inputValidationMiddleware';
import {descriptionValidation, nameValidation, websiteUrlValidation} from '../validations';


export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
  const allBlogs = blogsRepository.getAllBlogs()

  res.status(200).json(allBlogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
  const blog = blogsRepository.getBlog(req.params.id)

  if (blog) return res.status(200).json(blog)
  res.send(404)
})

blogsRouter.post('/',
  nameValidation, descriptionValidation, websiteUrlValidation,
  inputValidationMiddleware,
  basicAuthMiddleware,
  (req: Request, res: Response) => {
    const createdBlog = blogsRepository.createBlog(req.body)

    res.status(201).json(createdBlog)
  })

blogsRouter.put('/:id',
  nameValidation, descriptionValidation, websiteUrlValidation,
  basicAuthMiddleware,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const isEditedBlog = blogsRepository.editBlog(req.params.id, req.body)

    if (isEditedBlog) return res.send(204)
    res.send(404)
  })

blogsRouter.delete('/:id', basicAuthMiddleware, (req: Request, res: Response) => {
  const isBlogRemoved = blogsRepository.removeBlog(req.params.id)

  if (isBlogRemoved) return res.send(204)
  res.send(404)
})

