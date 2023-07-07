import {Request, Response, Router} from 'express';
import {blogs} from '../repositories/blogs-repository';
import {posts} from '../repositories/posts-repository';
import {videosCollection} from '../repositories/db';


export const removeAllDataRouter = Router({})

removeAllDataRouter.delete('/all-data', async (req: Request, res: Response) => {
  await videosCollection.deleteMany({})
  blogs.splice(0, blogs.length)
  posts.splice(0, posts.length)
  res.send(204)
})
