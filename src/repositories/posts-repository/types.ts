import {PaginatorViewModel} from '../../commonTypes/types';

export interface PostViewModel {
  id: string
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
}

export interface PostInputModel {
  title: string
  shortDescription: string
  content: string
  blogId: string
}

export interface PostItem extends PaginatorViewModel{
  items: PostViewModel[]
}
