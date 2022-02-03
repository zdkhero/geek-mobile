import { Channel, UserChannelResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils/http'

const CHANNEL_KEY = 'geek-channels'

export const getUseChannel = (): RootThunkAction => {
  return async (dispatch, getState) => {
    // 获取本地存储的 token
    const {
      login: { token }
    } = getState()

    if (token) {
      // 登录
      const res = await http.get<UserChannelResponse>('/user/channels')
      const { channels } = res.data.data

      console.log('登录', channels)
    } else {
      // 未登录的情况下，从本地获取存储的频道数据
      const localChannels = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as Channel[]

      if (localChannels.length > 0) {
        // 有频道列表数据
        console.log('未登录，本地有', localChannels)
      } else {
        // 没有频道列表数据
        const res = await http.get<UserChannelResponse>('/user/channels')
        const { channels } = res.data.data
        localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))

        console.log('未登录，本地没有', channels)
      }
    }
  }
}
