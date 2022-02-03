import { AllChannelsResponse, Channel, UserChannelResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils/http'
import differenceBy from 'lodash/differenceBy'

const CHANNEL_KEY = 'geek-channels'

// 获取用户的频道数据
export const getUserChannel = (): RootThunkAction => {
  return async (dispatch, getState) => {
    // 获取本地存储的 token
    const {
      login: { token }
    } = getState()

    // 存储频道列表数据
    let userChannel: Channel[] = []

    if (token) {
      // 登录
      const res = await http.get<UserChannelResponse>('/user/channels')
      const { channels } = res.data.data

      userChannel = channels
    } else {
      // 未登录的情况下，从本地获取存储的频道数据
      const localChannels = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as Channel[]

      if (localChannels.length > 0) {
        // 有频道列表数据
        userChannel = localChannels
      } else {
        // 没有频道列表数据
        const res = await http.get<UserChannelResponse>('/user/channels')
        const { channels } = res.data.data
        localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))

        userChannel = channels
      }
    }

    dispatch({ type: 'home/getUserChannel', payload: userChannel })
  }
}

// 获取所有的频道数据
export const getAllChannel = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await http.get<AllChannelsResponse>('channels')
    console.log(res)
    const {
      home: { userChannel }
    } = getState()

    const restChannels = differenceBy(res.data.data.channels, userChannel, 'id')

    dispatch({ type: 'home/getAllChannel', payload: restChannels })
  }
}
