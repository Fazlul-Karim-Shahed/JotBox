
import { AUTHENTICATED, LOGOUT } from './ActionTypes'

const initialState = {

    role: 'user',
    decodedToken: {},
    authenticated: false,
    selectedChatUser: {},
    currentChatRoomId: '',
    currentRoomMessage: []

}


const reducer = (state = initialState, action) => {

    if (action.type === AUTHENTICATED.type) {

        return {
            ...state,
            authenticated: action.value.authenticated,
            decodedToken: action.value.decodedToken
        }
    }

    if (action.type === 'SET_AUTH') {

        return {
            ...state,
            authenticated: action.value.authenticated,
            decodedToken: action.value.decodedToken
        }
    }

    if (action.type === 'SELECTED_CHAT_USER') {

        return {
            ...state,
            selectedChatUser: action.value.selectedChatUser
        }
    }

    if (action.type === 'CURRENT_CHAT_ROOM_ID') {

        return {
            ...state,
            currentChatRoomId: action.value.currentChatRoomId
        }
    }

    if (action.type === 'CURRENT_ROOM_MESSAGE') {

        return {
            ...state,
            currentRoomMessage: action.value.currentRoomMessage
        }
    }

    if (action.type === 'ADD_CURRENT_ROOM_MESSAGE') {

        let currentRoomMessage = [...state.currentRoomMessage]

        currentRoomMessage.push(action.value.addCurrentRoomMessage)
        return {
            ...state,
            currentRoomMessage: currentRoomMessage
        }
    }

    return state

}

export default reducer