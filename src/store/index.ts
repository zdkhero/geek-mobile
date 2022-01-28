import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// 导入根 reducer
import rootReducer from './reducers'

// 配置 redux 调试工具
const middlewares = composeWithDevTools(applyMiddleware(thunk))

// 创建 store 仓库
const store = createStore(rootReducer, middlewares)

export default store
