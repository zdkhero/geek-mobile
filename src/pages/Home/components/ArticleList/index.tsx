import { InfiniteScroll, PullToRefresh } from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList } from '@/store/actions/home'
import { RootState } from '@/types/store'

type Props = {
  channelId: number
}

const ArticleList = ({ channelId }: Props) => {
  // const [hasMore, setHasMore] = useState(true)
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
    // const timestamp = +new Date() + ''
    await dispatch(getArticleList(channelId, pre_timestamp))
  }

  // 是否加载更多数据
  // 如果 pre_timestamp 值为 null，说明没有更多数据了
  // 此时：hasMore 的值为 false，那么 InfiniteScroll 组件就不会获取数据了
  const hasMore = pre_timestamp !== null

  // 下拉刷新文章列表
  const onRefresh = async () => {
    await dispatch(getArticleList(channelId, Date.now() + ''))
  }

  const renderArticleList = () => {
    return results.map((item, index) => {
      const {
        title,
        pubdate,
        comm_count,
        aut_name,
        art_id,
        cover: { type, images }
      } = item

      const articleData = {
        title,
        pubdate,
        comm_count,
        aut_name,
        type,
        images,
        art_id
      }

      return (
        <div key={index} className="article-item">
          <ArticleItem {...articleData} />
        </div>
      )
    })
  }

  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        {/* 文章列表中的每一项 */}
        <div className="article-item">
          {/* 文章列表中的每一项 */}
          {renderArticleList()}
        </div>

        {/*
        loadMore 加载数据的函数
        hasMore 布尔值，true 表示还有更多数据；false 表示没有更多数据了
      */}

        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}

export default ArticleList
