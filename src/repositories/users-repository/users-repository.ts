import {UserViewModelDB} from './types';
import {usersCollection} from '../db';


export const usersRepository = {
  async createUser(newUser: UserViewModelDB): Promise<void> {
    await usersCollection.insertOne(newUser)
  },
  async removeUser(id: string): Promise<boolean> {
    const res = await usersCollection.deleteOne({id})

    return !!res.deletedCount
  }
}
