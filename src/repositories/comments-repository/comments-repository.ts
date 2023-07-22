import {CommentViewModelDB} from './types';
import {commentsCollection} from '../db';


export const commentsRepository = {
  async createComment(comment: CommentViewModelDB): Promise<void> {
    await commentsCollection.insertOne(comment)
  },
  async editComment(id: string, content: string): Promise<boolean> {
    const result = await commentsCollection.updateOne({id}, {$set: {content}})
    return !!result.matchedCount
  },
  async removeComment(id: string): Promise<boolean> {
    const result = await commentsCollection.deleteOne({id})
    return !!result.deletedCount
  }
}
