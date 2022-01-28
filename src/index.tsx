import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  // 给组件提供数据
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
