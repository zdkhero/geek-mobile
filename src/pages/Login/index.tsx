import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, NavBar, Form, Input, Toast } from 'antd-mobile'

import { login } from '@/store/actions/login'
import styles from './index.module.scss'

// 声明类型
type LoginForm = {
  mobile: string
  code: string
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 获取登录表单数据
  const onFinish = async (values: LoginForm) => {
    await dispatch(login(values))

    // 登录成功提示
    Toast.show({
      content: '登录成功',
      duration: 600,
      afterClose: () => {
        // 返回首页
        navigate('/', { replace: true })
      }
    })
  }

  return (
    <div className={styles.root}>
      <NavBar></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={onFinish} validateTrigger={['onBlur']}>
          <Form.Item
            name="mobile"
            className="login-item"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误'
              }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="code"
            className="login-item"
            rules={[{ required: true, message: '请输入验证码' }]}
            validateTrigger="onBlur"
            extra={<span className="code-extra">发送验证码</span>}
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle>
            <Button block type="submit" color="primary" className="login-submit">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
