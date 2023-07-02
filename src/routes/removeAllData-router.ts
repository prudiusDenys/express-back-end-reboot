import {Request, Response, Router} from 'express';
import {videos} from '../repositories/videos-repository';
import {blogs} from '../repositories/blogs-repository';
import {posts} from '../repositories/posts-repository';


export const removeAllDataRouter = Router({})

removeAllDataRouter.delete('/all-data', (req: Request, res: Response) => {
  videos.splice(0, videos.length)
  blogs.splice(0, videos.length)
  posts.splice(0, videos.length)
  res.send(204)
})
