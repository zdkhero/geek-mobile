import { http } from '@/utils/http'
import type { RootThunkAction } from '@/types/store'
import type { UserResponse, UserProfileResponse } from '@/types/data'

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
