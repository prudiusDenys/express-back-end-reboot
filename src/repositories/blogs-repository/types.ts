import {PaginatorViewModel, QueryParams} from '../../commonTypes/types';

export interface BlogViewModel {
  id: string
  name: string
  description: string
  websiteUrl: string
  createdAt: string
  isMembership: boolean
}

export interface BlogInputModel {
  name: string
  description: string
  websiteUrl: string
}

export interface BlogQueryInputModel extends QueryParams {
  searchNameTerm: string
}

export interface BlogItem extends PaginatorViewModel{
  items: BlogViewModel[]
}

export interface PostForSpecificBlogInputModel {
  title: string
  shortDescription: string
  content: string
}
