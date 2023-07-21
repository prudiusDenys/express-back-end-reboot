import {UserInputModel, UserViewModelDB} from '../repositories/users-repository/types';
import {v4 as uuid} from 'uuid';
import {usersRepository} from '../repositories/users-repository/users-repository';
import {generateHash} from '../utils/generateHash';


export const usersService = {
  async createUser(userData: UserInputModel): Promise<UserViewModelDB> {
    const hash = await generateHash(10, userData.password);

    const newUser: UserViewModelDB = {
      id: uuid(),
      email: userData.email,
      login: userData.login,
      createdAt: new Date().toISOString(),
      password: hash
    }

    await usersRepository.createUser({...newUser})

    return newUser
  }
}
