import type { LoginResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils/http'
import { setToken } from '@/utils/token'

// login 函数的参数类型
type LoginParams = { mobile: string; code: string }

// 登录功能
export const login = (values: LoginParams): RootThunkAction => {
  return async (dispatch) => {
    // 发送数据
    const res = await http.post<LoginResponse>('/authorizations', values)
    // 拿到返回的数据
    console.log(res)
    const { data: tokens } = res.data
    // 设置本地 token
    setToken(tokens)
    // 分发 action 将 token 保存到 redux state 中
    dispatch({ type: 'login/token', payload: tokens })
  }
}

// 获取验证码
export const getCode = (mobile: string) => {
  return async () => {
    // 注意：验证码是发送到手机上，不对存储到代码中，因此不需要操作 redux
    await http.get(`/sms/codes/${mobile}`)
  }
}
