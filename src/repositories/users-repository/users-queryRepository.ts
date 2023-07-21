import {UserOutputViewModel, UserQueryInputModel, UserViewModelDB} from './types';
import {calcPagesCount, calcSkipPages} from '../../utils/calculatePagination';
import {usersCollection} from '../db';


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
      const user = await usersCollection.findOne({login: {$regex: new RegExp(searchLoginTerm, 'i')}}, {projection: {_id: 0, password: 0}})

      if (user) {
        users.push(user)
        totalCount += 1
      }
    }
    if (searchEmailTerm) {
      const user = await usersCollection.findOne({email: {$regex: new RegExp(searchEmailTerm, 'i')}}, {projection: {_id: 0, password: 0}})

      if (user) {
        users.push(user)
        totalCount += 1
      }
    }
    if (!searchLoginTerm && !searchEmailTerm) {
      totalCount = (await usersCollection.find({}).toArray()).length

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
      totalCount,
      pageSize: +pageSize,
      items: users
    }
  }
}
