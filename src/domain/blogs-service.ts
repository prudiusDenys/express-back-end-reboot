import {BlogInputModel, BlogViewModel, PostForSpecificBlogInputModel} from '../repositories/blogs-repository/types';
import {v4 as uuid} from 'uuid';
import {blogsRepository} from '../repositories/blogs-repository/blogs-repository';
import {blogsQueryRepository} from '../repositories/blogs-repository/blogs-queryRepository';
import {PostViewModel} from '../repositories/posts-repository/types';


export const blogsService = {
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
  async createPostForSpecificBlog(postInputModel: PostForSpecificBlogInputModel, blogId: string) : Promise<PostViewModel | null> {
    const blog = await blogsQueryRepository.getBlog(blogId)
    if (!blog) return null

    const newPost: PostViewModel = {
      id: uuid(),
      title: postInputModel.title,
      shortDescription: postInputModel.shortDescription,
      content: postInputModel.content,
      blogId: blog.id,
      blogName: blog.name,
      createdAt: new Date().toISOString()
    }

    await blogsRepository.createPostForSpecificBlog({...newPost})

    return newPost
  }
}
