import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, NavBar, Form, Input, Toast } from 'antd-mobile'

import { getCode, login } from '@/store/actions/login'
import styles from './index.module.scss'
import { AxiosError } from 'axios'
import { InputRef } from 'antd-mobile/es/components/input'

// 声明类型
type LoginForm = {
  mobile: string
  code: string
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const mobileRef = useRef<InputRef>(null)

  // 创建 form 实例
  const [form] = Form.useForm()

  // 获取登录表单数据
  const onFinish = async (values: LoginForm) => {
    try {
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
    } catch (e) {
      // 异常
      // 如果异步操作失败了，会执行此处的错误处理
      // 对于登录功能来说，出错了，通常是请求出现了问题
      // 因此，此处将错误类型转为 AxiosError
      const error = e as AxiosError<{ message: string }>

      Toast.show({
        content: error.response?.data?.message,
        duration: 1000
      })
    }
  }

  // 获取手机号
  const onGetCode = () => {
    // 拿到手机号
    const mobile = (form.getFieldValue('mobile') ?? '') as string

    // 判断手机号验证是否成功
    const hasError = form.getFieldError('mobile').length > 0

    if (mobile.trim() === '' || hasError) {
      return mobileRef.current?.focus()
    }

    dispatch(getCode(mobile))
  }

  return (
    <div className={styles.root}>
      <NavBar></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={onFinish} validateTrigger={['onBlur']} form={form}>
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
            <Input placeholder="请输入手机号" ref={mobileRef} />
          </Form.Item>

          <Form.Item
            name="code"
            className="login-item"
            rules={[{ required: true, message: '请输入验证码' }]}
            validateTrigger="onBlur"
            extra={
              <span className="code-extra" onClick={() => onGetCode()}>
                发送验证码
              </span>
            }
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              // isFieldsTouched(true) 检查是否所有字段都被操作过
              const untouched = !form.isFieldsTouched(true)
              // getFieldsError() 获取所有字段名对应的错误信息
              const hasError = form.getFieldsError().filter(({ errors }) => errors.length).length !== 0
              const disabled = untouched || hasError
              return (
                <Button block type="submit" color="primary" className="login-submit" disabled={disabled}>
                  登 录
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
