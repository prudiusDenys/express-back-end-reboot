import {PostItem, PostViewModel} from './types';
import {postsCollection} from '../db';
import {calcPagesCount, calcSkipPages} from '../../utils/calculatePagination';
import {QueryParams} from '../../commonTypes/types';


export let posts: PostViewModel[] = []

export const postsQueryRepository = {
  async getAllPosts(postQueryInputModel: QueryParams): Promise<PostItem> {
    const {
      sortBy = 'createdAt',
      sortDirection = 'desc',
      pageNumber = '1',
      pageSize = '10'
    } = postQueryInputModel

    const allPostsCount = (await postsCollection.find({}).toArray()).length

    const allPosts = await postsCollection
      .find({}, {projection: {_id: 0}})
      .skip(calcSkipPages(+pageNumber, +pageSize))
      .limit(+pageSize)
      .sort({[sortBy]: sortDirection == 'asc' ? 1 : -1})
      .toArray()

    return {
      pagesCount: calcPagesCount(allPostsCount, +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: allPostsCount,
      items: allPosts
    }
  },
  async getPost(id: string): Promise<PostViewModel | null> {
    const post = postsCollection.findOne({id}, {projection: {_id: 0}})

    if (post) return post
    return null
  }
}
