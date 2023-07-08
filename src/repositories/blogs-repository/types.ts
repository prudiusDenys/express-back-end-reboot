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
