import {UserOutputViewModel, UserQueryInputModel, UserViewModelDB} from './types';
import {calcPagesCount, calcSkipPages} from '../../utils/calculatePagination';
import {usersCollection} from '../db';
import {getUniqueUsers} from '../../utils/getUniqueUsers';


export const usersQueryRepository = {
  async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserViewModelDB | null> {
    return usersCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
  },
  async getAllUsers(query: UserQueryInputModel): Promise<UserOutputViewModel> {
    const {
      sortBy = 'createdAt',
      pageSize = '10',
      sortDirection = 'desc',
      pageNumber = '1',
      searchLoginTerm = null,
      searchEmailTerm = null
    } = query

    let totalCount = 0, users = []

    if (searchLoginTerm) {
      const foundUsers = await usersCollection
        .find({login: {$regex: new RegExp(searchLoginTerm, 'i')}}, {projection: {_id: 0, password: 0}})
        .toArray()

      if (foundUsers.length) {
        users = [...users, ...foundUsers]
        totalCount += foundUsers.length
      }
    }
    if (searchEmailTerm) {
      const foundUsers = await usersCollection
        .find({email: {$regex: new RegExp(searchEmailTerm, 'i')}}, {projection: {_id: 0, password: 0}})
        .toArray()

      if (foundUsers.length) {
        users = [...users, ...foundUsers]
        totalCount += foundUsers.length
      }
    }
    if (!searchLoginTerm && !searchEmailTerm) {
      totalCount = await usersCollection.countDocuments()

      users = await usersCollection
        .find({}, {projection: {_id: 0, password: 0}})
        .skip(calcSkipPages(+pageNumber, +pageSize))
        .limit(+pageSize)
        .sort({[sortBy]: sortDirection == 'asc' ? 1 : -1})
        .toArray()
    }

    return {
      pagesCount: calcPagesCount(totalCount, +pageSize),
      page: +pageNumber,
      totalCount: getUniqueUsers(users).length,
      pageSize: +pageSize,
      items: getUniqueUsers(users)
    }
  }
}
