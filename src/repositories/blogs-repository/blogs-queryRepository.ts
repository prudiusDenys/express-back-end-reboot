import {BlogItem, BlogQueryInputModel, BlogViewModel} from './types';
import {blogsCollection, postsCollection} from '../db';
import {calcPagesCount, calcSkipPages} from '../../utils/calculatePagination';
import {QueryParams} from '../../commonTypes/types';


export let blogs: BlogViewModel[] = []

export const blogsQueryRepository = {
  async getAllBlogs(blogQueryInputModel: BlogQueryInputModel): Promise<BlogItem> {
    const {
      searchNameTerm,
      sortBy = 'createdAt',
      sortDirection = 'desc',
      pageNumber = '1',
      pageSize = '10'
    } = blogQueryInputModel

  const allBlogsCount = (await blogsCollection
    .find(searchNameTerm ? {'name': {$regex: new RegExp(searchNameTerm, 'i')}} : {})
    .toArray()).length

    const allBlogs = await blogsCollection
      .find(searchNameTerm ? {'name': {$regex: new RegExp(searchNameTerm, 'i')}}: {}, {projection: {_id: 0}})
      .skip(calcSkipPages(+pageNumber, +pageSize))
      .limit(+pageSize)
      .sort({[sortBy]: sortDirection == 'asc' ? 1 : -1})
      .toArray()

    return {
      pagesCount: calcPagesCount(allBlogsCount, +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: allBlogsCount,
      items: allBlogs
    }
  },
  async getAllPostsForSpecificPost(blogQueryInputModel: QueryParams, blogId: string): Promise<any> {
    const blog = await blogsCollection.findOne({id: blogId}, {projection: {_id: 0}})

    if(!blog) return null

    const {
      sortBy = 'createdAt',
      sortDirection = 'desc',
      pageNumber = '1',
      pageSize = '10'
    } = blogQueryInputModel

    const allPostsCount =  (await postsCollection.find({blogId}).toArray()).length

    const allPosts = await postsCollection.find({blogId}, {projection: {_id: 0}})
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
  async getBlog(id: string): Promise<BlogViewModel | null> {
    const blog = await blogsCollection.findOne({id}, {projection: {_id: 0}})

    if (blog) return blog
    return null
  }
}
