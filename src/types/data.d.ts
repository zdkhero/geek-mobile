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

type ApiResponse<Data> = {
  message: string
  data: Data
}

// 统一处理axios响应类型：
// login 接口的响应类型
export type LoginResponse = ApiResponse<Token>
// 用户信息 接口的响应类型
export type UserResponse = ApiResponse<User>
// 个人信息 接口的响应类型
export type UserProfileResponse = ApiResponse<UserProfile>
