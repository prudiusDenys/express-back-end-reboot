import {PostViewModel} from './types';
import {postsCollection} from '../db';


export let posts: PostViewModel[] = []

export const postsQueryRepository = {
  async getAllPosts(): Promise<PostViewModel[]> {
    return postsCollection.find({}, {projection: {_id: 0}}).toArray()
  },
  async getPost(id: string): Promise<PostViewModel | null> {
    const post = postsCollection.findOne({id}, {projection: {_id: 0}})

    if (post) return post
    return null
  }
}
