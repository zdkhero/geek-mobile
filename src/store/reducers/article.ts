import { ArticleDetail } from '@/types/data'
import { ArticleAction } from '@/types/store'

type ArticleState = {
  detail: ArticleDetail
}

const initialState = {
  detail: {}
} as ArticleState

const article = (state = initialState, action: ArticleAction): ArticleState => {
  if (action.type === 'article/get') {
    return {
      ...state,
      detail: action.payload
    }
  }
  return state
}

export default article
