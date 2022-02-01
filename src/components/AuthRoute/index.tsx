import { getToken } from '@/utils/token'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  // 获取 Token
  const token = getToken().token

  // 判断 Token 是否存在
  if (!token) {
    // 如果不存在，跳转到登录页面
    return <Navigate to="/login" replace={true}></Navigate>
  }

  return children
}

export default AuthRoute
