import { Channel } from '@/types/data'
import { HomeAction } from '@/types/store'

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

    default:
      return state
  }
}

export default home
