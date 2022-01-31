import axios from 'axios'
import store from '@/store'
import { Toast } from 'antd-mobile'

const http = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
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
  (error) => {
    if (!error.response) {
      // 网路超时
      Toast.show({
        content: '网络繁忙，请稍后再试',
        duration: 1000
      })
      return Promise.reject(error)
    }

    if (error.response.status === 401) {
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
    return Promise.reject(error)
  }
)

export { http }
