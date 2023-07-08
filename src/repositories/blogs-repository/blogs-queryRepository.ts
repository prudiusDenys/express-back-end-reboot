import {BlogViewModel} from './types';
import {blogsCollection} from '../db';


export let blogs: BlogViewModel[] = []

export const blogsQueryRepository = {
  async getAllBlogs(): Promise<BlogViewModel[]> {
    return blogsCollection.find({}, {projection: {_id: 0}}).toArray()
  },
  async getBlog(id: string): Promise<BlogViewModel | null> {
    const blog = await blogsCollection.findOne({id}, {projection: {_id: 0}})

    if (blog) return blog
    return null
  }
}
