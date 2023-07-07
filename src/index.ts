import express from 'express'
import {videosRouter} from './routes/videos-router';
import {removeAllDataRouter} from './routes/removeAllData-router';
import {blogsRouter} from './routes/blogs-router';
import {postsRouter} from './routes/posts-router';
import {runDb} from './repositories/db';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//routes
app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', removeAllDataRouter)

const startApp = async () => {
  await runDb()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp().catch(() => console.dir())
