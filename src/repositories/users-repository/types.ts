import {PaginatorViewModel, QueryParams} from '../../commonTypes/types';


export interface UserQueryInputModel extends QueryParams {
  searchLoginTerm: string | null
  searchEmailTerm: string | null
}

export interface UserViewModel {
  id: string
  login: string
  email: string
  createdAt: string
}

export interface UserViewModelDB extends UserViewModel{
  password: string
}

export interface UserInputModel {
  login: string
  password: string
  email: string
}

export interface UserOutputViewModel extends PaginatorViewModel{
  items: UserViewModel[]
}
