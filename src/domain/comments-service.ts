import {commentsQueryRepository} from '../repositories/comments-repository/comments-queryRepository';
import {commentsRepository} from '../repositories/comments-repository/comments-repository';
import {HttpCodes} from '../http-codes/http-codes';


export const commentsService = {
  async editComment(commentId: string, content: string, userId: string): Promise<HttpCodes> {
    const comment = await commentsQueryRepository.findCommentById(commentId)

    if (!comment) return HttpCodes.NOT_FOUND
    if (comment.commentatorInfo.userId !== userId) return HttpCodes.FORBIDDEN

    const result = await commentsRepository.editComment(commentId, content)
    if (result) return HttpCodes.NO_CONTENT
  },
  async removeComment(commentId: string, userId: string): Promise<HttpCodes> {
    const comment = await commentsQueryRepository.findCommentById(commentId)

    if (!comment) return HttpCodes.NOT_FOUND
    if (comment.commentatorInfo.userId !== userId) return HttpCodes.FORBIDDEN

    const result = await commentsRepository.removeComment(commentId)

    if (result) return HttpCodes.NO_CONTENT
  }
}
