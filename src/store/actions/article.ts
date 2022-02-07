import { ArticleDetailResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils/http'

// 导入 dayjs 相关包
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

export const getArticleById = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ArticleDetailResponse>(`/articles/${id}`)

    const detail = res.data.data

    dispatch({
      type: 'article/get',
      payload: {
        ...detail,
        // 格式化日期：
        pubdate: dayjs(detail.pubdate).locale('zh-cn').format('LL')
      }
    })
  }
}

export default getArticleById
