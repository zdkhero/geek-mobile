import { Tabs } from 'antd-mobile'
import Icon from '@/components/Icon'

import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserChannel } from '@/store/actions/home'
import { RootState } from '@/types/store'

const Home = () => {
  const dispatch = useDispatch()
  const { userChannel } = useSelector((state: RootState) => state.home)

  useEffect(() => {
    dispatch(getUserChannel())
  }, [dispatch])

  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {/* 注意：此处别忘了添加 tabs 类名 */}
      {userChannel.length > 0 && (
        <Tabs className="tabs" activeLineMode="fixed">
          {userChannel.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              推荐频道的内容
            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  )
}

export default Home
