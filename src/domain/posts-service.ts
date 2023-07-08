import {PostInputModel, PostViewModel} from '../repositories/posts-repository/types';
import {v4 as uuid} from 'uuid';
import {postsRepository} from '../repositories/posts-repository/posts-repository';
import {blogsQueryRepository} from '../repositories/blogs-repository/blogs-queryRepository';

export const postsService =  {
  async createPost(postInputModel: PostInputModel): Promise<PostViewModel> {
    const blog = await blogsQueryRepository.getBlog(postInputModel.blogId)

    const newPost: PostViewModel = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      blogName: blog!.name,
      ...postInputModel
    }

    await postsRepository.createPost({...newPost})

    return newPost
  },
}
