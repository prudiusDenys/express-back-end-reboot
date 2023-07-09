import {Request, Response, Router} from 'express';
import {handleVideoErrors} from '../utils/handleErrors';
import {videosRepository} from '../repositories/videos-repository/videos-repository';
import {videosQueryRepository} from '../repositories/videos-repository/videos-queryRepository';
import {videosService} from '../domain/videos-service';


export const videosRouter = Router({})

videosRouter.get('/', async (req: Request, res: Response) => {
  const allVideos = await videosQueryRepository.findAllVideos()

  res.status(200).json(allVideos)
})

videosRouter.get('/:id', async (req: Request, res: Response) => {
  const video = await videosQueryRepository.findVideo(+req.params.id)

  if (video) return res.status(200).json(video)
  res.send(404)
})

videosRouter.post('/', async (req: Request, res: Response) => {
  const {title, author, availableResolutions} = req.body
  const errorMessage = handleVideoErrors.postErrors(title, author, availableResolutions)

  if (errorMessage.errorsMessages.length) return res.status(400).json(errorMessage)

  const newVideo = await videosService.createVideo(title, author, availableResolutions)

  res.status(201).json(newVideo)
})

videosRouter.put('/:id', async (req: Request, res: Response) => {
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

  const isVideoUpdated = await videosRepository.editVideo(+req.params.id, req.body)

  if (isVideoUpdated) return res.send(204)
  res.send(404)
})

videosRouter.delete('/:id', async (req: Request, res: Response) => {
  const isVideoRemoved = await videosRepository.removeVideo(+req.params.id)

  if (isVideoRemoved) return res.send(204)
  res.send(404)
})
