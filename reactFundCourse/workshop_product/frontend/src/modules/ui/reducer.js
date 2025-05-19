import { TOGGLE_DARK_MODE } from "./actions"

const initialState = {
    darkMode: false,
    flashMessage: null
}

export default function uiReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_DARK_MODE:
            return { ...state, darkMode: !state.darkMode }
        default:
            return state
    }
}