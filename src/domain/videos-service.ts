import {VideoViewModel} from '../repositories/videos-repository/types';
import {videosRepository} from '../repositories/videos-repository/videos-repository';

export const videosService = {
  async createVideo(title: string, author: string, availableResolutions: []): Promise<VideoViewModel> {
    const date = new Date()

    const newVideo: VideoViewModel = {
      id: Number(date),
      title,
      author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: date.toISOString(),
      publicationDate: new Date(date.getTime() + 86400000).toISOString(),
      availableResolutions
    }

    await videosRepository.createVideo(newVideo)

    return newVideo
  },
}
