import axios from "axios"

export const createMessage = (sender, receiver, message, chatRoomId, sendingTime) => {

    let data = axios.post(process.env.REACT_APP_BACKEND + '/api/message/', {
        sender: sender,
        receiver: receiver,
        message: message,
        chatRoomId: chatRoomId,
        sendingTime: sendingTime
    }).then(data => {
        return data.data
    })

    return data

}


export const getRoomMessage = (roomId) => {

    let data = axios.get(process.env.REACT_APP_BACKEND + '/api/message/' + roomId).then(data => data.data)

    return data

}

