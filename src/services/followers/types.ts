export type GetUsersRequestType = {
  cursor: number
  search?: string
  pageSize: number
  pageNumber: number
}

export type GetUserDataResponseType = {
  id: 0
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: string
  aboutMe: string
  avatars: [
    {
      url: string
      width: number
      height: number
      fileSize: number
    },
  ]
  isFollowing: boolean
  isFollowedBy: boolean
  followingCount: number
  followersCount: number
  publicationsCount: number
}

export type GetUsersFollowersDataRequestType = {
  userName: string
  search?: string
  pageNumber?: number
  pageSize?: number
  cursor: number
}

export type GetUsersFollowersDataResponseType = {
  items: []
  nextCursor: null
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
