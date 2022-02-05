import { SuggestionResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils/http'

export const getSuggestion = (value: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<SuggestionResponse>('/suggestion', {
      params: {
        q: value
      }
    })

    console.log(res)

    dispatch({
      type: 'search/suggestion',
      payload: res.data.data.options
    })
  }
}
