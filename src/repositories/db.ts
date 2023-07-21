import {MongoClient} from 'mongodb';
import 'dotenv/config'
import {VideoViewModel} from './videos-repository/types';
import {BlogViewModel} from './blogs-repository/types';
import {PostViewModel} from './posts-repository/types';
import {UserViewModelDB} from './users-repository/types';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('URI is missing')
}

const client = new MongoClient(mongoUri)
const dataBase = client.db('express-project-dev')

export const videosCollection = dataBase.collection<VideoViewModel>('videos')
export const blogsCollection = dataBase.collection<BlogViewModel>('blogs')
export const postsCollection = dataBase.collection<PostViewModel>('posts')
export const usersCollection = dataBase.collection<UserViewModelDB>('users')

export async function runDb() {
  try {
    await client.connect()
    console.log('Connected successfully to the server')
  } catch {
    console.log('Don\'t connected to the server')
    await client.close()
  }
}
