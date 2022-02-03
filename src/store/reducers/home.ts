import { Channel } from '@/types/data'
import { HomeAction } from '@/types/store'

type HomeState = {
  userChannel: Channel[]
  restChannel: Channel[]
}

const initialState: HomeState = {
  userChannel: [],
  restChannel: []
}

const home = (state = initialState, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'home/getUserChannel':
      return {
        ...state,
        userChannel: action.payload
      }
    case 'home/getAllChannel':
      return {
        ...state,
        restChannel: action.payload
      }

    default:
      return state
  }
}

export default home
