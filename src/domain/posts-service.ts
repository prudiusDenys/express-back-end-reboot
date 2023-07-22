import {PostInputModel, PostViewModel} from '../repositories/posts-repository/types';
import {v4 as uuid} from 'uuid';
import {postsRepository} from '../repositories/posts-repository/posts-repository';
import {blogsQueryRepository} from '../repositories/blogs-repository/blogs-queryRepository';
import {postsQueryRepository} from '../repositories/posts-repository/posts-queryRepository';
import {CommentViewModel} from '../repositories/comments-repository/types';
import {commentsRepository} from '../repositories/comments-repository/comments-repository';

export const postsService = {
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
  async createComment(postId: string, comment: string, userId: string, userLogin: string): Promise<CommentViewModel | null> {
    const post = await postsQueryRepository.getPost(postId)
    if (!post) return null

    const newComment = {
      id: uuid(),
      content: comment,
      commentatorInfo: {
        userId: userId,
        userLogin: userLogin
      },
      createdAt: new Date().toISOString()
    }

    await commentsRepository.createComment({...newComment})

    return newComment
  }
}
