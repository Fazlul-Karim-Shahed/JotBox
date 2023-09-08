import axios from "axios"

export const createChatRoom = (user1, user2) => {

    let data = axios.post(process.env.REACT_APP_BACKEND + '/api/chatroom/' + user1 + '/' + user2).then(data => {
        return data.data
    })

    return data

}