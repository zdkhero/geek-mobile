import { Channel } from '@/types/data'
import { HomeAction } from '@/types/store'
import { sortBy } from 'lodash'

type HomeState = {
  userChannel: Channel[]
  restChannel: Channel[]
  channelActiveKey: string
}

const initialState: HomeState = {
  userChannel: [],
  restChannel: [],
  channelActiveKey: ''
}

const home = (state = initialState, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'home/getUserChannel':
      return {
        ...state,
        userChannel: action.payload,
        // 设置默认值
        channelActiveKey: action.payload[0]?.id + ''
      }
    case 'home/getAllChannel':
      return {
        ...state,
        restChannel: action.payload
      }
    case 'home/changeTab':
      return {
        ...state,
        channelActiveKey: action.payload
      }
    case 'home/delChannel':
      return {
        ...state,
        // 删除当前频道
        userChannel: state.userChannel.filter((item) => item.id !== action.payload.id),
        // 将被删除频道添加到推荐频道中，并且根据 id 进行排序
        restChannel: sortBy([...state.restChannel, action.payload], 'id')
      }

    default:
      return state
  }
}

export default home
