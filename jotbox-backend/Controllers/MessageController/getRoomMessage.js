
const _ = require('lodash')
const MessageSchema = require('../../Schemas/MessageSchema')
const { checkRequiredFields } = require('../../Controllers/checkRequiredFields')

const getRoomMessage = async (req, res) => {

    let chatRoomId = req.params.chatRoomId

    let roomMessage = await MessageSchema.find({ chatRoomId: chatRoomId }).populate(['sender', 'receiver'])

    if (roomMessage.length === 0) {
        res.send({ message: 'No message found', error: true })

    }
    else {
        res.send({ message: 'All room message', error: false, data: roomMessage })

    }




}

module.exports.getRoomMessage = getRoomMessage

