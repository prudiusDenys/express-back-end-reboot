import {UserViewModel, UserViewModelDB} from '../repositories/users-repository/types';

export const normalizeUser = (user: UserViewModelDB): UserViewModel => {
  return {
    id: user.id,
    createdAt: user.createdAt,
    login: user.login,
    email: user.email
  }
}
