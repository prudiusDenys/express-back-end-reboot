import {PostInputModel, PostViewModel} from './types';
import {postsCollection} from '../db';


export const postsRepository = {
  async createPost(postInputModel: PostViewModel): Promise<void> {
    await postsCollection.insertOne(postInputModel)
  },
  async editPost(id: string, postInputModel: PostInputModel): Promise<true | null> {
    const post = await postsCollection.findOne({id})

    if (post) {
      await postsCollection.updateOne({id}, {
        $set: {
          title: postInputModel.title,
          shortDescription: postInputModel.shortDescription,
          content: postInputModel.content,
          blogId: postInputModel.blogId
        }
      })
      return true
    } else {
      return null
    }
  },
  async removePost(id: string): Promise<boolean> {
    const post = await postsCollection.findOne({id})

    if (post) {
      await postsCollection.deleteOne({id})
      return true
    }
    return false
  }
}
