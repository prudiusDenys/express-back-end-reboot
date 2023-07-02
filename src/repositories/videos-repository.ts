export enum Resolutions {
  P144 = 'P144',
  P240 = 'P240',
  P360 = 'P360',
  P480 = 'P480',
  P720 = 'P720',
  P1080 = 'P1080',
  P1440 = 'P1440',
  P2160 = 'P2160'
}

interface VideoViewModel {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRestriction: null | number
  createdAt: string,
  publicationDate: string
  availableResolutions: Resolutions[]
}

interface UpdateVideoInputModel {
  title: string
  author: string
  availableResolutions: Resolutions[]
  canBeDownloaded: boolean
  minAgeRestriction: null | number
  publicationDate: string
}

export let videos: VideoViewModel[] = []

export const videosRepository = {
  findAllVideos(): VideoViewModel[] {
    return videos
  },
  findVideo(id: number): VideoViewModel | null {
    const video = videos.find(video => video.id === id)
    if (video) {
      return video
    }
    return null
  },
  createVideo(title: string, author: string, availableResolutions: []): VideoViewModel {
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

    videos.push(newVideo)

    return newVideo
  },
  editVideo(id: number, updateVideoInputModel: UpdateVideoInputModel): true | null {
    const video = videos.find(video => video.id === id)

    if (video) {
      video.title = updateVideoInputModel.title
      video.author = updateVideoInputModel.author
      video.availableResolutions = updateVideoInputModel.availableResolutions
      video.canBeDownloaded = updateVideoInputModel.canBeDownloaded
      video.minAgeRestriction = updateVideoInputModel.minAgeRestriction
      video.publicationDate = updateVideoInputModel.publicationDate
      return true
    }
    return null
  },
  removeVideo(id: number): true | null {
    const video = videos.find(video => video.id === id)
    if (video) {
      videos = videos.filter(video => video.id !== id)
      return true
    } else {
      return null
    }
  }
}
