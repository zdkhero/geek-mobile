import { ThunkAction } from 'redux-thunk'
import store from '@/store'

import type { Token, User, Channel } from './data'

// Redux 应用的状态
type RootState = ReturnType<typeof store.getState>

// 使用中间件后的 Redux dispatch 类型
// ReturnType: thunk action 的返回类型
// State：Redux 应用的状态
// ExtraThunkArg: 额外的参数，没有用到，可以指定为 unknown
// BasicAction: 非 thunk action，即对象形式的 action
type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

// 登录相关的 action 类型
type LoginAction =
  | {
      type: 'login/token'
      payload: Token
    }
  | {
      type: 'login/logout'
    }

// 获取用户信息的 action 类型
type ProfileAction =
  | {
      type: 'profile/getUser'
      payload: User
    }
  | {
      type: 'profile/getUserProfile'
      payload: UserProfile
    }
  | {
      type: 'profile/update'
      payload: Partial<UserProfile>
    }

// 首页相关的 action 类型
type HomeAction =
  | {
      type: 'home/getUserChannel'
      payload: Channel[]
    }
  | {
      type: 'home/getAllChannel'
      payload: Channel[]
    }
  | {
      type: 'home/changeTab'
      payload: string
    }
  | {
      type: 'home/delChannel'
      payload: Channel
    }
  | {
      type: 'home/addChannel'
      payload: Channel
    }
  | {
      type: 'home/getChannelArticles'
      payload: {
        // 频道 id
        channelId: number
        // 该频道的文章列表数据
        data: Articles
      }
    }

export type SearchAction =
  | {
      type: 'search/suggestion'
      payload: Suggestion['options']
    }
  | { type: 'search/clearSuggestion' }

// 文章相关的 action 类型

// 项目中所有 action 类型
type RootAction = LoginAction | ProfileAction | HomeAction | SearchAction
