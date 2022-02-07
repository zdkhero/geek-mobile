import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import DOMPurify from 'dompurify'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'
import ContentLoader from 'react-content-loader'

import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import getArticleById from '@/store/actions/article'
import { RootState } from '@/types/store'
// 导入 lodash 的节流函数
import throttle from 'lodash/throttle'

const Article = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()
  // 表示文章是否加载中的状态
  const [loading, setLoading] = useState(true)
  // 创建文章可滚动区域的ref对象
  const wrapperRef = useRef<HTMLDivElement>(null)
  // 创建导航栏作者信息的ref对象
  const authorRef = useRef<HTMLDivElement>(null)
  // 控制导航栏中作者信息的展示和隐藏
  const [isShowNavAuthor, setIsShowNavAuthor] = useState(false)
  // 创建评论信息的DOM对象的 ref
  const commentRef = useRef<HTMLDivElement>(null)

  /**
   * 导航栏高度的常量
   */
  const NAV_BAR_HEIGTH = 45

  useEffect(() => {
    const load = async () => {
      await dispatch(getArticleById(params.id as string))
      setLoading(false)
    }
    load()
  }, [dispatch, params])

  const { detail } = useSelector((state: RootState) => state.article)

  // 文章详情 代码内容 高亮
  useEffect(() => {
    const dgHtmlDOM = document.querySelector('.dg-html')
    const codes = dgHtmlDOM?.querySelectorAll<HTMLElement>('pre code')
    console.log(codes)
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

  // 给文章详情可滚动区域绑定滚动事件
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const author = authorRef.current
    if (!author) return

    // 此处，通过节流函数 throttle 来降低滚动事件的触发频率
    const onScroll = throttle(() => {
      // console.log('滚动了', author.getBoundingClientRect().top)
      // height 表示：自己的高度
      // top 表示：距离页面顶部的距离
      const { height, top } = author.getBoundingClientRect()
      if (top <= NAV_BAR_HEIGTH - height) {
        // console.log('展示在标题栏中')
        setIsShowNavAuthor(true)
      } else {
        // console.log('从标题栏中隐藏')
        setIsShowNavAuthor(false)
      }
    }, 100)

    wrapper.addEventListener('scroll', onScroll)
    return () => {
      wrapper.removeEventListener('scroll', onScroll)
    }
  }, [loading])

  // 点击跳转到评论内容
  const onShowComment = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const comment = commentRef.current
    if (!comment) return

    const commentTop = comment.getBoundingClientRect().top
    wrapper.scrollTo({
      top: commentTop - NAV_BAR_HEIGTH,
      // 如果想要滚动时，带有动画效果，可以使用 smooth 即可
      behavior: 'auto'
    })
  }

  const loadMoreComments = async () => {
    console.log('加载更多评论')
  }

  if (loading) {
    return (
      // 根据当前页面结构，设计好的 loading 效果
      <ContentLoader
        speed={2}
        width={375}
        height={230}
        viewBox="0 0 375 230"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
        <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
        <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
        <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
        <circle cx="33" cy="69" r="17" />
        <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
        <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
        <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
        <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
        <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
        <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
      </ContentLoader>
    )
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
      <div className="wrapper" ref={wrapperRef}>
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{title}</h1>

            <div className="info">
              <span>2019-03-11</span>
              <span>{read_count} 阅读</span>
              <span>{comm_count} 评论</span>
            </div>

            <div className="author" ref={authorRef}>
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

        <div className="comment" ref={commentRef}>
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
          {isShowNavAuthor && (
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
        <CommentFooter onShowComment={onShowComment} />
      </div>
    </div>
  )
}

export default Article
