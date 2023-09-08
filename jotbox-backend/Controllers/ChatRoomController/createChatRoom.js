
const _ = require('lodash')
const ChatRoom = require('../../Schemas/ChatRoomSchema')

const createChatRoom = async (req, res) => {


    if (req.params.user2 == undefined) { res.send({ message: `Something wrong`, error: true }) }

    else{
        let arr = [req.params.user1, req.params.user2]
        arr.sort()[0]

        let data = await ChatRoom.findOne({ user1: arr[0], user2: arr[1] }).populate(['user1', 'user2'])

        if (data) {

            res.send({ message: `Room found`, error: false, data: data })
        }

        else {

            let newChatRoom = new ChatRoom({ user1: arr[0], user2: arr[1] })
            newChatRoom = await newChatRoom.save()
            res.send({ message: 'Room created', error: false, data: newChatRoom })

        }

    }





}

module.exports.createChatRoom = createChatRoom

