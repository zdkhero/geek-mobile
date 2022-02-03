import { Channel } from '@/types/data'
import { HomeAction } from '@/types/store'

type HomeState = {
  userChannel: Channel[]
}

const initialState: HomeState = {
  userChannel: []
}

const home = (state = initialState, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'home/getUserChannel':
      return {
        ...state,
        userChannel: action.payload
      }

    default:
      return state
  }
}

export default home
