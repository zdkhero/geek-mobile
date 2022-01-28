import { combineReducers } from 'redux'

// 导入登录模块
import { login } from './login'

// 根 reducer
const rootReducer = combineReducers({
  login
})

export default rootReducer
