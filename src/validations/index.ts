import {body} from 'express-validator';

export const nameValidation = body('name').isString().trim().notEmpty().isLength({max: 15})
export const descriptionValidation = body('description').isString().trim().notEmpty().isLength({max: 500})
export const websiteUrlValidation = body('websiteUrl').isString().trim().notEmpty().isLength({max: 100})
export const titleValidation = body('title').isString().trim().notEmpty().isLength({max: 30})
export const shortValidation = body('shortDescription').isString().trim().notEmpty().isLength({max: 100})
export const contentValidation = body('content').isString().trim().notEmpty().isLength({max: 1000})
export const blogIdValidation = body('blogId').isString().trim().notEmpty()