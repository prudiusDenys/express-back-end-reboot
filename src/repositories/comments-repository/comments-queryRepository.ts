import {commentsCollection, postsCollection} from '../db';
import {CommentItem, CommentViewModel} from './types';
import {QueryParams} from '../../commonTypes/types';
import {calcPagesCount, calcSkipPages} from '../../utils/calculatePagination';

export const commentsQueryRepository = {
  async findCommentById(id: string): Promise<CommentViewModel | null> {
    return commentsCollection.findOne({id}, {projection: {_id: 0, postId: 0}})
  },
  async getAllCommentsForSpecificPost(query: QueryParams, postId: string): Promise<CommentItem | null> {
    const post = await postsCollection.findOne({id: postId}, {projection: {_id: 0}})

    if (!post) return null

    const {
      sortBy = 'createdAt',
      sortDirection = 'desc',
      pageNumber = '1',
      pageSize = '10'
    } = query

    const allCommentsCount = (await commentsCollection.find({postId}).toArray()).length

    const allComments = await commentsCollection.find({postId}, {projection: {_id: 0, postId: 0}})
      .skip(calcSkipPages(+pageNumber, +pageSize))
      .limit(+pageSize)
      .sort({[sortBy]: sortDirection == 'asc' ? 1 : -1})
      .toArray()

    return {
      pagesCount: calcPagesCount(allCommentsCount, +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: allCommentsCount,
      items: allComments
    }
  }
}
