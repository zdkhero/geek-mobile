import { combineReducers } from 'redux'

// 导入登录模块
import { login } from './login'
import profile from './profile'
import home from './home'

// 根 reducer
const rootReducer = combineReducers({
  login,
  profile,
  home
})

export default rootReducer
