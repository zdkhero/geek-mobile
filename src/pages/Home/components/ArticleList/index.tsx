import React, { useState } from 'react'
import { InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList } from '@/store/actions/home'
import { RootState } from '@/types/store'

type Props = {
  channelId: number
}

const ArticleList = ({ channelId }: Props) => {
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch()
  // 获取当前频道的文章列表数据
  const { channelArticles } = useSelector((state: RootState) => state.home)
  // 注意：此处的 频道对应的 文章列表数据，可能是不存在的，所以，此处设置默认值
  const currentChannelArticle = channelArticles[channelId] ?? {
    pre_timestamp: Date.now(),
    results: []
  }
  const { pre_timestamp, results } = currentChannelArticle

  async function loadMore() {
    const timestamp = +new Date() + ''
    await dispatch(getArticleList(channelId, timestamp))
  }

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <div className="article-item">
        {/* 文章列表中的每一项 */}
        {results.map((item, index) => (
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
