import {
  TOGGLE_DARK_MODE,
  SET_DARK_MODE,
  SET_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
} from './actions'

const initialState = {
  darkMode: false,
  flashMessage: null,
}

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode }
    case SET_DARK_MODE:
      return { ...state, darkMode: action.payload.darkMode }
    case SET_FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload.message }
    case CLEAR_FLASH_MESSAGE:
      return { ...state, flashMessage: null }
    default:
      return state
  }
}