import {UserViewModel, UserViewModelDB} from '../repositories/users-repository/types';
import {CommentViewModel, CommentViewModelDB} from '../repositories/comments-repository/types';

export const normalizeUser = (user: UserViewModelDB): UserViewModel => {
  return {
    id: user.id,
    createdAt: user.createdAt,
    login: user.login,
    email: user.email
  }
}

export const normalizeComment = (comment: CommentViewModelDB): CommentViewModel => {
  return {
    id: comment.id,
    commentatorInfo: comment.commentatorInfo,
    content: comment.content,
    createdAt: comment.createdAt
  }
}
