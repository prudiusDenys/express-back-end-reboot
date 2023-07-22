import {body} from 'express-validator';
import {blogsQueryRepository} from '../repositories/blogs-repository/blogs-queryRepository';


export const nameValidation = body('name').isString().trim().notEmpty().isLength({max: 15})
export const descriptionValidation = body('description').isString().trim().notEmpty().isLength({max: 500})
export const websiteUrlValidation = body('websiteUrl').isString().trim().notEmpty().isLength({max: 100}).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
export const titleValidation = body('title').isString().trim().notEmpty().isLength({max: 30})
export const shortValidation = body('shortDescription').isString().trim().notEmpty().isLength({max: 100})
export const contentValidation = body('content').isString().trim().notEmpty().isLength({max: 1000})
export const blogIdValidation = body('blogId').isString().trim().notEmpty().custom(async blogId  => {
  const blog = await blogsQueryRepository.getBlog(blogId)
  if(!blog) throw new Error();
})
export const loginValidation = body('login').isString().trim().notEmpty().isLength({min: 3, max: 10}).matches(/^[a-zA-Z0-9_-]*$/)
export const passwordValidation = body('password').isString().trim().notEmpty().isLength({min: 6, max: 20}).matches(/^[a-zA-Z0-9_-]*$/)
export const loginOrEmailValidation = body('loginOrEmail').isString().trim().notEmpty()
export const emailValidation = body('email').isString().trim().notEmpty().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
export const CommentContentValidation = body('content').isString().trim().notEmpty().isLength({min: 20, max: 300})
