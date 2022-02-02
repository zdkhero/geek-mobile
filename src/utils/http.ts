import axios from 'axios'
import store from '@/store'
import { Toast } from 'antd-mobile'
import { setToken } from './token'

const baseURL = 'http://toutiao.itheima.net/v1_0'
const http = axios.create({
  baseURL,
  // baseURL: process.env.REACT_APP_URL,
  timeout: 5000
})

// 统一添加token在请求头
http.interceptors.request.use(
  (config) => {
    // 对config进行修改，每次请求前做的事情
    const {
      login: { token }
    } = store.getState()

    // 除了登录请求外，其他请求统一添加 token
    if (!config.url?.startsWith('/authorizations')) {
      // 此处，需要使用 非空断言 来去掉 headers 类型中的 undefined 类型
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  (e) => Promise.reject(e)
)

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    if (!error.response) {
      // 网路超时
      Toast.show({
        content: '网络繁忙，请稍后再试',
        duration: 1000
      })
      return Promise.reject(error)
    }

    if (error.response.status === 401) {
      try {
        const { refresh_token } = store.getState().login
        if (!refresh_token) {
          // 1 手动抛出异常
          // throw new Error(error)

          // 2 因为 try-catch 无法直接捕获 Promise 的异常，所以，此处
          //   通过 await 等待 Promise 完成。然后，try-catch 就可以
          //   捕获到该异常了
          await Promise.reject(error)
        } else {
          const res = await axios.put(`${baseURL}/authorizations`, null, {
            headers: {
              Authorization: `Bearer ${refresh_token}`
            }
          })

          // 使用新拿到的 token 替换本地的 token 以及 redux 中的 token
          // 组装所有 token
          const tokens = {
            // token 是最新的，接口返回的
            token: res.data.data.token,
            // 因为接口没有返回新的 refresh_token，所以，需要使用原来的
            refresh_token
          }
          setToken(tokens)

          store.dispatch({ type: 'login/token', payload: tokens })

          // 继续完成原来要执行的操作
          // 比如，在获取个人资料时，token 超时了，最终，在拿到最新的 token 后
          //      要继续获取个人资料
          // console.dir(error)
          // 可以通过 error.config 来拿到原来发送的请求的相关信息
          // 所以，要执行原来的操作，只需要将 error.config 重新请求一次即可
          // 注意：此处，一定要返回 Promise 的结果
          return http(error.config)
        }
      } catch (error) {
        // token 过期，登录超时
        Toast.show({
          content: '登录超时，请重新登录',
          duration: 1000,
          afterClose: () => {
            // 删除token
            // 跳转到登录页，并携带当前要访问的页面，这样，登录后可以继续返回该页面
            window.location.pathname = '/login'
          }
        })
      }
    }
    return Promise.reject(error)
  }
)

export { http }
