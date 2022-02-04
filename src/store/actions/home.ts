import { AllChannelsResponse, ArticlesResponse, Channel, UserChannelResponse } from '@/types/data'
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

// 删除频道
export const delChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    const {
      login: { token }
    } = getState()

    if (token) {
      // 已登录
      await http.delete(`/user/channels/${channel.id}`)
    } else {
      // 未登录
      const localChannels = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as Channel[]

      const userChannel = localChannels.filter((item) => item.id !== channel.id)
      localStorage.setItem(CHANNEL_KEY, JSON.stringify(userChannel))
    }

    dispatch({ type: 'home/delChannel', payload: channel })
  }
}

export const addChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    const {
      login: { token }
    } = getState()

    if (token) {
      // 登录
      await http.patch('/user/channels', [channel])
    } else {
      // 未登录
      const localChannels = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as Channel[]
      const userChannel = [...localChannels, channel]
      localStorage.setItem(CHANNEL_KEY, JSON.stringify(userChannel))
    }

    dispatch({ type: 'home/addChannel', payload: channel })
  }
}

export const getArticleList = (channel_id: number, timestamp: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ArticlesResponse>('/articles', {
      params: {
        channel_id,
        timestamp
      }
    })

    console.log(res)
  }
}
