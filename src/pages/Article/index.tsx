import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import DOMPurify from 'dompurify'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import getArticleById from '@/store/actions/article'
import { RootState } from '@/types/store'

const Article = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(getArticleById(params.id as string))
  }, [dispatch, params])

  const { detail } = useSelector((state: RootState) => state.article)

  // 文章详情 代码内容 高亮
  useEffect(() => {
    const dgHtmlDOM = document.querySelector('.dg-html')
    const codes = dgHtmlDOM?.querySelectorAll<HTMLElement>('pre code')
    // console.log(codes)
    if (codes && codes.length > 0) {
      codes.forEach((el) => {
        // 让每个 code 内容实现代码高亮
        highlight.highlightElement(el)
      })
      return
    }

    highlight.configure({
      // 忽略警告
      ignoreUnescapedHTML: true
    })

    // 直接找到所有的 pre 标签
    const pres = dgHtmlDOM?.querySelectorAll('pre')
    if (pres && pres.length > 0) {
      pres.forEach((el) => {
        highlight.highlightElement(el)
      })
    }
  }, [detail])

  const loadMoreComments = async () => {
    console.log('加载更多评论')
  }

  const renderArticle = () => {
    // 解构出文章详情数据：
    const {
      // art_id,
      // aut_id,
      // // 是否点赞
      // attitude,
      // // 是否收藏
      // is_collected,
      content,
      is_followed,
      aut_name,
      aut_photo,
      comm_count,
      like_count,
      pubdate,
      read_count,
      title
    } = detail

    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{title}</h1>

            <div className="info">
              <span>2019-03-11</span>
              <span>{read_count} 阅读</span>
              <span>{comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={aut_photo || 'http://geek.itheima.net/images/user_head.jpg'} alt="" />
              <span className="name">{aut_name}</span>
              <span className={classNames('follow', is_followed ? 'followed' : '')}>{true ? '已关注' : '关注'}</span>
            </div>
          </div>

          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content)
              }}
            />
            <div className="date">发布文章时间：{pubdate}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（10）</span>
            <span>{like_count} 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll hasMore={false} loadMore={loadMoreComments} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => navigate(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">黑马先锋</span>
              <span className={classNames('follow', true ? 'followed' : '')}>{true ? '已关注' : '关注'}</span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article
