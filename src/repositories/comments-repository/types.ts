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
