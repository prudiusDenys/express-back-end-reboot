import {BlogInputModel, BlogViewModel} from './types';
import {blogsCollection} from '../db';


export const blogsRepository = {
  async createBlog(createdBlog: BlogViewModel): Promise<void> {
    await blogsCollection.insertOne(createdBlog)
  },
  async editBlog(id: string, blogInputModel: BlogInputModel): Promise<true | null> {
    const blog = await blogsCollection.findOne({id})

    if (blog) {
      await blogsCollection.updateOne({id}, {
        $set: {
          name: blogInputModel.name,
          description: blogInputModel.description,
          websiteUrl: blogInputModel.websiteUrl
        }
      })
      return true
    } else {
      return null
    }
  },
  async removeBlog(id: string): Promise<boolean> {
    const blog = await blogsCollection.findOne({id})

    if (blog) {
      await blogsCollection.deleteOne({id})
      return true
    }
    return false
  }
}
