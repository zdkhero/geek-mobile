import classnames from 'classnames'
import { useNavigate } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSuggestion } from '@/store/actions/search'

const SearchPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchTxt, setSearchTxt] = useState('')

  // 监听搜索框内容的改变
  const onSearchChange = (value: string) => {
    setSearchTxt(value)
    dispatch(getSuggestion(value))
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => navigate(-1)}
        right={
          <span className="search-text" onClick={() => navigate('/search/result')}>
            搜索
          </span>
        }
      >
        <SearchBar placeholder="请输入关键字搜索" value={searchTxt} onChange={onSearchChange} />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: true ? 'none' : 'block'
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div className={classnames('search-result', true ? 'show' : '')}>
        <div className="result-item">
          <Icon className="icon-search" type="iconbtn_search" />
          <div className="result-value text-overflow">
            <span>黑马</span>
            程序员
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
