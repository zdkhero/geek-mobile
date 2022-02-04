// 登录接口返回的数据类型
export type Token = {
  token: string
  refresh_token: string
}

// 我的 - 个人信息
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}

// 个人详细信息
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}

export type Channel = {
  id: number
  name: string
}

export type UserChannel = {
  channels: Channel[]
}

export type AllChannels = {
  channels: Channel[]
}

type ApiResponse<Data> = {
  message: string
  data: Data
}

export type Article = {
  art_id: string
  aut_id: string
  aut_name: string
  comm_count: number
  pubdate: string
  title: string
  cover: {
    type: number
    images: string[]
  }
}

export type ArticleList = {
  pre_timestamp: string
  results: Article[]
}

// 统一处理axios响应类型：
// login 接口的响应类型
export type LoginResponse = ApiResponse<Token>
// 用户信息 接口的响应类型
export type UserResponse = ApiResponse<User>
// 个人信息 接口的响应类型
export type UserProfileResponse = ApiResponse<UserProfile>
export type UserPhotoResponse = ApiResponse<{
  photo: string
}>

export type UserChannelResponse = ApiResponse<UserChannel>
export type AllChannelsResponse = ApiResponse<AllChannels>

export type ArticlesResponse = ApiResponse<ArticleList>
