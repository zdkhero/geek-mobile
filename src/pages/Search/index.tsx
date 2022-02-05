import classnames from 'classnames'
import { useNavigate } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSuggestion, getSuggestion } from '@/store/actions/search'

// import debounce from 'lodash/debounce'
import { useDebounceFn } from 'ahooks'
import { RootState } from '@/types/store'
import { useEffect, useState } from 'react'

let GEEK_SEARCH_KEY = 'geet-search-history'

const SearchPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  let { suggestion } = useSelector((state: RootState) => state.search)
  suggestion = suggestion[0] === null ? [] : suggestion
  const [searchTxt, setSearchTxt] = useState('')

  // const debounceFn = debounce((value) => {
  //   dispatch(getSuggestion(value))
  // }, 500)

  const { run: debounceGetSuggest } = useDebounceFn(
    (value: string) => {
      dispatch(getSuggestion(value))
    },
    {
      wait: 500
    }
  )

  // 监听搜索框内容的改变
  const onSearchChange = (value: string) => {
    // console.log(value)
    setSearchTxt(value)
    // dispatch(getSuggestion(value))
    if (value.trim() === '') return dispatch(clearSuggestion())
    debounceGetSuggest(value)
  }

  const highlightSuggestion = suggestion.map((item) => {
    const lowerCaseItem = item.toLocaleLowerCase()
    const lowerCaseSearchTxt = searchTxt.toLocaleLowerCase()
    const index = lowerCaseItem.indexOf(lowerCaseSearchTxt)

    const searchTxtLength = searchTxt.length

    const left = item.slice(0, index)
    const right = item.slice(index + searchTxtLength)
    const search = item.slice(index, index + searchTxtLength)

    return {
      left,
      right,
      search
    }
  })

  const onSearch = (value: string) => {
    dispatch(clearSuggestion())
    navigate(`/search/result?q=${value}`)
    saveHistories(value)
  }

  const saveHistories = (value: string) => {
    const localHistories = JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]') as string[]
    let histories = []

    if (localHistories.length === 0) {
      // 没有
      histories = [value]
    } else {
      // 有
      const exist = localHistories.indexOf(value) >= 0
      if (exist) {
        // 存在
        const leftHistories = localHistories.filter((item) => item !== value)
        histories = [value, ...leftHistories]
      } else {
        // 不存在
        histories = [value, ...localHistories]
      }
    }

    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(histories))
  }

  useEffect(() => {
    const histories = JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]') as string[]

    setSearchHistory(histories)
  }, [])

  const onDeleteHistory = (value: string) => {
    const newSearchHistory = searchHistory.filter((item) => item !== value)
    setSearchHistory(newSearchHistory)
    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(newSearchHistory))
  }
  const onClearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem(GEEK_SEARCH_KEY)
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => navigate(-1)}
        right={
          <span className="search-text" onClick={() => onSearch(searchTxt)}>
            搜索
          </span>
        }
      >
        <SearchBar placeholder="请输入关键字搜索" onChange={onSearchChange} />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: suggestion.length > 0 ? 'none' : 'block'
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={onClearHistory}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {searchHistory.map((item, index) => (
              <div key={index} className="history-item">
                <span className="text-overflow">{item}</span>
                <Icon type="iconbtn_essay_close" onClick={() => onDeleteHistory(item)} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={classnames('search-result', suggestion.length > 0 ? 'show' : '')}>
        {highlightSuggestion.map((item, index) => (
          <div key={index} className="result-item">
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value" onClick={() => onSearch(item.left + item.search + item.right)}>
              {item.left}
              {/* 放在 span 中的内容会高亮 */}
              <span>{item.search}</span>
              {item.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
