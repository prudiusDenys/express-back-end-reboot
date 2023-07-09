import {UpdateVideoInputModel, VideoViewModel} from './types';
import {videosCollection} from '../db';


export const videosRepository = {
  async createVideo(newVideo: VideoViewModel): Promise<void> {
    await videosCollection.insertOne(newVideo)
  },
  async editVideo(id: number, updateVideoInputModel: UpdateVideoInputModel): Promise<boolean | null> {
    const video = await videosCollection.findOne({id})

    if (video) {
      const res = await videosCollection.updateOne({id}, {
        $set: {
          title: updateVideoInputModel.title,
          author: updateVideoInputModel.author,
          availableResolutions: updateVideoInputModel.availableResolutions,
          canBeDownloaded: updateVideoInputModel.canBeDownloaded,
          minAgeRestriction: updateVideoInputModel.minAgeRestriction,
          publicationDate: updateVideoInputModel.publicationDate
        }
      })

      return !!res.matchedCount
    }
    return null
  },
  async removeVideo(id: number): Promise<true | null> {
    const video = await videosCollection.findOne({id})

    if (video) {
      await videosCollection.deleteOne({id})
      return true
    } else {
      return null
    }
  }
}
