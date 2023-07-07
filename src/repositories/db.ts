import {MongoClient} from 'mongodb';
import 'dotenv/config'
import {VideoViewModel} from './videos-repository/types';

const mongoUri = process.env.MONGO_URI;

if(!mongoUri){
  throw new Error('URI is missing')
}

const client = new MongoClient(mongoUri)
const dataBase = client.db('express-project-dev')

export const videosCollection = dataBase.collection<VideoViewModel>('videos')

export async function runDb() {
  try {
    await client.connect()
    console.log('Connected successfully to the server')
  } catch {
    console.log('Don\'t connected to the server')
    await client.close()
  }
}
