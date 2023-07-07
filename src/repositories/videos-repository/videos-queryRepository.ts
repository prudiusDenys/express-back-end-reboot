import {VideoViewModel} from './types';
import {videosCollection} from '../db';

export const videosQueryRepository = {
 async findAllVideos(): Promise<VideoViewModel[]> {
    return videosCollection.find({}, {projection: {_id: 0}}).toArray()
  },
 async findVideo(id: number): Promise<VideoViewModel | null>  {
    const video = await videosCollection.findOne({id}, {projection: {_id: 0}})
    if (video) {
      return video
    }
    return null
  }
}
