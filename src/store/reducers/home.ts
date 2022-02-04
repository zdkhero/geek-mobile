import { ArticleList, Channel } from '@/types/data'
import { HomeAction } from '@/types/store'
import { sortBy } from 'lodash'

type HomeState = {
  userChannel: Channel[]
  restChannel: Channel[]
  channelActiveKey: string
  channelArticles: {
    [key: number]: ArticleList
  }
}

const initialState: HomeState = {
  userChannel: [],
  restChannel: [],
  channelActiveKey: '',
  channelArticles: {}
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
    case 'home/addChannel':
      return {
        ...state,
        userChannel: [...state.userChannel, action.payload],
        restChannel: state.restChannel.filter((item) => item.id !== action.payload.id)
      }
    case 'home/getChannelArticles':
      // 注意：当前频道的文章列表数据可能为空（比如，第一次加载），为了方便后续操作
      //      此处为其指定默认值
      const curChannelArticles = state.channelArticles[action.payload.channelId] ?? {
        pre_timestamp: null,
        results: []
      }
      const {
        channelId,
        data: { pre_timestamp, results }
      } = action.payload

      return {
        ...state,
        channelArticles: {
          ...state.channelArticles,
          // 修改当前频道对应的文章列表数据
          [channelId]: {
            pre_timestamp,
            // 追加文章列表数据
            results: [...curChannelArticles.results, ...results]
          }
        }
      }

    default:
      return state
  }
}

export default home
