import {Request, Response, Router} from 'express';
import {blogsCollection, postsCollection, videosCollection} from '../repositories/db';


export const removeAllDataRouter = Router({})

removeAllDataRouter.delete('/all-data', async (req: Request, res: Response) => {
  await videosCollection.deleteMany({})
  await blogsCollection.deleteMany({})
  await postsCollection.deleteMany({})
  res.send(204)
})
