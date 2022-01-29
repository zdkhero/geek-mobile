import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// 导入根 reducer
import rootReducer from './reducers'
import { getToken } from '@/utils/token'

// 配置 redux 调试工具
const middlewares = composeWithDevTools(applyMiddleware(thunk))

// 初始化状态
const initalState = {
  // 注意：此处的 login 属性是根据合并 reducer 时，login 的名称而来的
  login: getToken()
}

// 创建 store 仓库
const store = createStore(rootReducer, initalState, middlewares)

export default store
