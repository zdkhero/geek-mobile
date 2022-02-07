import { combineReducers } from 'redux'

// 导入登录模块
import { login } from './login'
import profile from './profile'
import home from './home'
import search from './search'
import article from './article'

// 根 reducer
const rootReducer = combineReducers({
  login,
  profile,
  home,
  search,
  article
})

export default rootReducer
