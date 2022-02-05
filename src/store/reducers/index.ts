import { combineReducers } from 'redux'

// 导入登录模块
import { login } from './login'
import profile from './profile'
import home from './home'
import search from './search'

// 根 reducer
const rootReducer = combineReducers({
  login,
  profile,
  home,
  search
})

export default rootReducer
