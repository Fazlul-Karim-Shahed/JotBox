import { checkAuth, tokenDecode } from "../Function/AuthFunctions";

export const AUTHENTICATED = {
    type: 'AUTHENTICATED',
    value: {
        authenticated: checkAuth(),
        decodedToken: tokenDecode()
    }
}

export const SET_AUTH = decodedToken => {
    return {
        type: 'SET_AUTH',
        value: {
            authenticated: true,
            decodedToken: tokenDecode()
        }
    }
}


export const SELECTED_CHAT_USER = obj => {
    return {
        type: 'SELECTED_CHAT_USER',
        value: {
            selectedChatUser: obj
        }
    }
}


export const CURRENT_CHAT_ROOM_ID = id => {
    return {
        type: 'CURRENT_CHAT_ROOM_ID',
        value: {
            currentChatRoomId: id
        }
    }
}



export const CURRENT_ROOM_MESSAGE = array => {
    console.log(array)
    return {
        type: 'CURRENT_ROOM_MESSAGE',
        value: {
            currentRoomMessage: array
        }
    }
}

export const ADD_CURRENT_ROOM_MESSAGE = data => {
    return {
        type: 'ADD_CURRENT_ROOM_MESSAGE',
        value: {
            addCurrentRoomMessage: data
        }
    }
}
