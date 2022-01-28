import { Button } from 'antd-mobile'

const Login = () => {
  return (
    <div>
      <p>
        <svg className="icon" aria-hidden="true">
          {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
          <use xlinkHref="#iconbtn_like_sel"></use>
        </svg>
      </p>
      <Button color="primary">Primary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
      <Button color="warning">Warning</Button>
    </div>
  )
}

export default Login
