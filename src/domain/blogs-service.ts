import {BlogInputModel, BlogViewModel} from '../repositories/blogs-repository/types';
import {v4 as uuid} from 'uuid';
import {blogsRepository} from '../repositories/blogs-repository/blogs-repository';


export const blogsService =  {
  async createBlog(blogInputModel: BlogInputModel): Promise<BlogViewModel> {
    const newBlog: BlogViewModel = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      isMembership: false,
      ...blogInputModel
    }

    await blogsRepository.createBlog({...newBlog})

    return newBlog
  },
}
