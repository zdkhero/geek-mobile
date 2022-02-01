import { http } from '@/utils/http'
import type { RootThunkAction } from '@/types/store'
import type { UserResponse, UserProfileResponse, UserProfile, UserPhotoResponse } from '@/types/data'

// 获取用户信息
export const getUser = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<UserResponse>('/user')
    const { data } = res.data

    // 存储 redux 中
    // 因为已经有 TS 类型，所以，此处代码都是有提示的
    dispatch({
      type: 'profile/getUser',
      payload: data
    })
  }
}

// 获取个人信息
export const getUserProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<UserProfileResponse>('/user/profile')
    dispatch({ type: 'profile/getUserProfile', payload: res.data.data })
  }
}

// 更新用户昵称
export const updateUserProfile = (userProfile: Partial<UserProfile>): RootThunkAction => {
  return async (dispatch) => {
    await http.patch('/user/profile', userProfile)

    // 分发 action 以更新用户昵称
    dispatch({ type: 'profile/update', payload: userProfile })
  }
}

// 更新用户头像
export const updateUserPhoto = (data: FormData): RootThunkAction => {
  return async (diapatch) => {
    const res = await http.patch<UserPhotoResponse>('/user/photo', data)

    console.log(res)
    diapatch({
      type: 'profile/update',
      payload: {
        photo: res.data.data.photo
      }
    })
  }
}
