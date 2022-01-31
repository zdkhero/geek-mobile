import type { User, UserProfile } from '@/types/data'
import { ProfileAction } from '@/types/store'

type ProfileState = {
  user: User
  userProfile: UserProfile
}

const initialState = {
  user: {},
  userProfile: {}
} as ProfileState

const profile = (state = initialState, action: ProfileAction) => {
  switch (action.type) {
    // 获取用户信息
    case 'profile/getUser':
      return {
        ...state,
        user: action.payload
      }
    case 'profile/getUserProfile':
      return {
        ...state,
        userProfile: action.payload
      }
    default:
      return state
  }
}

export default profile
