import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Popup } from 'antd-mobile'

import Icon from '@/components/Icon'
import Channels from './components/Channels'
import ArticleList from './components/ArticleList'

import { getUserChannel } from '@/store/actions/home'
import { RootState } from '@/types/store'

import styles from './index.module.scss'

const Home = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const onChannelOpen = () => {
    setVisible(true)
  }

  const onChannelClose = () => {
    setVisible(false)
  }

  const onTabChange = (key: string) => {
    dispatch({ type: 'home/changeTab', payload: key })
  }

  const { userChannel, channelActiveKey } = useSelector((state: RootState) => state.home)

  useEffect(() => {
    dispatch(getUserChannel())
  }, [dispatch])

  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {/* 注意：此处别忘了添加 tabs 类名 */}
      {userChannel.length > 0 && (
        <Tabs className="tabs" activeLineMode="fixed" activeKey={channelActiveKey} onChange={onTabChange}>
          {userChannel.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              {/* 在每个 Tabs.TabPane 中渲染文章列表组件 */}
              <ArticleList channelId={item.id} />
            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={onChannelOpen} />
      </div>

      <Popup visible={visible} onMaskClick={onChannelClose} position="left" className="channel-popup">
        <Channels onClose={onChannelClose} />
      </Popup>
    </div>
  )
}

export default Home
