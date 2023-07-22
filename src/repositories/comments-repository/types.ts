import {PaginatorViewModel} from '../../commonTypes/types';

interface CommentatorInfo {
  userId: string
  userLogin: string
}

export interface CommentViewModel {
  id: string
  content: string
  commentatorInfo: CommentatorInfo,
  createdAt: string
}

export interface CommentViewModelDB extends CommentViewModel {
  postId: string
}

export interface CommentItem extends PaginatorViewModel {
  items: CommentViewModel[]
}
