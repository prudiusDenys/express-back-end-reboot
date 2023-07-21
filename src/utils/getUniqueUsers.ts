import {UserViewModel} from '../repositories/users-repository/types';

export const getUniqueUsers = (users: UserViewModel[]) => {
  let usersId = []
  const uniqueUsers = []

  for (let i = 0; i < users.length; i++) {
    if (!usersId.includes(users[i].id)) {
      usersId.push(users[i].id)
      uniqueUsers.push(users[i])
    }
  }

  return uniqueUsers
}
