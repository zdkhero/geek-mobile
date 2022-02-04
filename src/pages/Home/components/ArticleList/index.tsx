import React, { useState } from 'react'
import { InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { getArticleList } from '@/store/actions/home'

type Props = {
  channelId: number
}

const ArticleList = ({ channelId }: Props) => {
  const [data, setData] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch()

  async function loadMore() {
    const timestamp = +new Date() + ''
    await dispatch(getArticleList(channelId, timestamp))
  }

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <div className="article-item">
        {/* 文章列表中的每一项 */}
        {data.map((item, index) => (
          <div key={index} className="article-item">
            <ArticleItem type={1} />
          </div>
        ))}
      </div>

      {/*
        loadMore 加载数据的函数
        hasMore 布尔值，true 表示还有更多数据；false 表示没有更多数据了
      */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default ArticleList
