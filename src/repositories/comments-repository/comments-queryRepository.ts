import {commentsCollection} from '../db';
import {CommentViewModel} from './types';

export const commentsQueryRepository = {
  async findCommentById(id: string): Promise<CommentViewModel | null> {
    return commentsCollection.findOne({id})
  }
}
