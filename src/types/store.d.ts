import { ThunkAction } from 'redux-thunk'
import store from '@/store'

import { Token } from './data'

// Redux 应用的状态
export type RootState = ReturnType<typeof store.getState>

// 使用中间件后的 Redux dispatch 类型
// ReturnType: thunk action 的返回类型
// State：Redux 应用的状态
// ExtraThunkArg: 额外的参数，没有用到，可以指定为 unknown
// BasicAction: 非 thunk action，即对象形式的 action
export type RootThunAction = ThunkAction<void, RootState, unknown, RootAction>

// 项目中所有 action 类型
type RootAction = unknown

// 登录相关的 action 类型
export type LoginAction = {
  type: 'login/token'
  payload: Token
}

// 文章相关的 action 类型