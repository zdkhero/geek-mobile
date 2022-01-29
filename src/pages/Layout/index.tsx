import Icon from '@/components/Icon'
import { TabBar } from 'antd-mobile'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

const tabs = [
  { path: '/', icon: 'iconbtn_home', text: '首页' },
  { path: '/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/profile', icon: 'iconbtn_mine', text: '我的' }
]

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const changeRoute = (path: string) => {
    navigate(path)
  }

  return (
    <div className={styles.root}>
      <Outlet />
      <TabBar className="tab-bar" activeKey={location.pathname} onChange={(key) => changeRoute(key)}>
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => <Icon type={active ? `${item.icon}_sel` : item.icon} className="tab-bar-item-icon" />}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
