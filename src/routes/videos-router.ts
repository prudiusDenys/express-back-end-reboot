import {Request, Response, Router} from 'express';
import {handleVideoErrors} from '../utils/handleErrors';
import {videosRepository} from '../repositories/videos-repository';


export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
  const allVideos = videosRepository.findAllVideos()
  res.status(200).json(allVideos)
})

videosRouter.get('/:id', (req: Request, res: Response) => {
  const video = videosRepository.findVideo(+req.params.id)
  if (video) {
    res.status(200).json(video)
  } else {
    res.send(404)
  }
})

videosRouter.post('/', (req: Request, res: Response) => {
  const {title, author, availableResolutions} = req.body
  const errorMessage = handleVideoErrors.postErrors(title, author, availableResolutions)

  if (errorMessage.errorsMessages.length) return res.status(400).json(errorMessage)

  const newVideo = videosRepository.createVideo(title, author, availableResolutions)

  res.status(201).json(newVideo)
})

videosRouter.put('/:id', (req: Request, res: Response) => {
  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate
  } = req.body
  const errorMessage = handleVideoErrors.putErrors(
    title, author, availableResolutions,
    canBeDownloaded, minAgeRestriction, publicationDate
  )

  if (errorMessage.errorsMessages.length) return res.status(400).json(errorMessage)

  const isVideoUpdated = videosRepository.editVideo(+req.params.id, req.body)

  if (isVideoUpdated) {
    res.send(204)
  } else {
    res.send(404)
  }
})

videosRouter.delete('/:id', (req: Request, res: Response) => {
  const isVideoRemoved = videosRepository.removeVideo(+req.params.id)
  if (isVideoRemoved) {
    res.send(204)
  } else {
    res.send(404)
  }
})
