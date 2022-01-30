import type { User } from '@/types/data'
import { ProfileAction } from '@/types/store'

type ProfileState = {
  user: User
}

const initialState = {
  user: {}
} as ProfileState

const profile = (state = initialState, action: ProfileAction) => {
  switch (action.type) {
    // 获取用户信息
    case 'profile/getUser':
      return {
        ...state,
        user: action.payload
      }

    default:
      return state
  }
}

export default profile
