import {usersQueryRepository} from '../repositories/users-repository/users-queryRepository';
import bcrypt from 'bcrypt';
import {UserViewModelDB} from '../repositories/users-repository/types';


export const authService = {
  async checkCredentials(loginOrEmail: string, password: string): Promise<UserViewModelDB | null> {
    const user = await usersQueryRepository.findUserByLoginOrEmail(loginOrEmail)
    if (!user) return null

    const matched = await bcrypt.compare(password, user.password)
    if (matched) return user

    return null
  }
}
