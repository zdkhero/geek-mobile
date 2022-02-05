import { useLocation, useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchResult } from '@/store/actions/search'
import { RootState } from '@/types/store'

const Result = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const params = new URLSearchParams(location.search)
  const q = params.get('q') ?? ''

  useEffect(() => {
    dispatch(getSearchResult(q))
  }, [dispatch, q])

  const {
    searchResults: { results }
  } = useSelector((state: RootState) => state.search)

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
        art_id,
        images
      }

      return (
        <div key={index} className="article-item" onClick={() => navigate(`/article/${art_id}`)}>
          <ArticleItem {...articleData} />
        </div>
      )
    })
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => navigate(-1)}>搜索结果</NavBar>
      <div className="article-list">{renderArticleList()}</div>
    </div>
  )
}

export default Result
