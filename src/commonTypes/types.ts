export interface QueryParams {
  sortBy: string
  sortDirection: string
  pageNumber: string
  pageSize: string
}

export interface PaginatorViewModel {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
}
