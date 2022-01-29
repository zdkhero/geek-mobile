import { Token } from '@/types/data'

// 使用常量来存储 key
const GEEK_TOKEN_KEY = 'geek-h5-token'

// 创建 获取 token
// export const getToken = (): Token => JSON.parse(localStorage.getItem(GEEK_TOKEN_KEY) || '{}')

// ?? 空值合并运算符的短路用法：当空值合并运算符的左表达式不为 null 或 undefined 时，不会对右表达式进行求值
export const getToken = () =>
  JSON.parse(localStorage.getItem(GEEK_TOKEN_KEY) ?? '{ "token": "", "refresh_token": "" }') as Token

// 创建 设置 token
export const setToken = (token: Token) => localStorage.setItem(GEEK_TOKEN_KEY, JSON.stringify(token))

// 创建 清除 token
export const clearToken = () => localStorage.removeItem(GEEK_TOKEN_KEY)

// 创建 根据 token 判断是否登录
export const isAuth = () => !!getToken()
