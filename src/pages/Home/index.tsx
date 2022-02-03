import { Tabs } from 'antd-mobile'
import Icon from '@/components/Icon'

import styles from './index.module.scss'

const Home = () => {
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {/* 注意：此处别忘了添加 tabs 类名 */}
      <Tabs className="tabs" activeLineMode="fixed">
        <Tabs.Tab title="推荐" key="1">
          推荐频道的内容
        </Tabs.Tab>
        <Tabs.Tab title="html" key="2">
          html频道的内容
        </Tabs.Tab>
        <Tabs.Tab title="开发者资讯" key="3">
          开发者资讯频道的内容
        </Tabs.Tab>
        <Tabs.Tab title="c++" key="4">
          c++频道的内容
        </Tabs.Tab>
        <Tabs.Tab title="css" key="5">
          css频道的内容
        </Tabs.Tab>
      </Tabs>

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  )
}

export default Home
