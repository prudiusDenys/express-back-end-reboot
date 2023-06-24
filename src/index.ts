import express from 'express'
import {videosRouter} from './routes/videos-router';
import {removeAllDataRouter} from './routes/removeAllData-router';

const app = express()
const port = 3000

app.use(express.json())

//routes
app.use('/videos', videosRouter)
app.use('/testing', removeAllDataRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
