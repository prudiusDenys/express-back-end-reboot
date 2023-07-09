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

export interface QueryParams {
  sortBy: string
  sortDirection: string
  pageNumber: string
  pageSize: string
}

export interface BlogQueryInputModel extends QueryParams {
  searchNameTerm: string
}

export interface BlogItem {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: BlogViewModel[]
}

export interface PostForSpecificBlogInputModel {
  title: string
  shortDescription: string
  content: string
}
