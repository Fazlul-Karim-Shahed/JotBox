
const _ = require('lodash')
const MessageSchema = require('../../Schemas/MessageSchema')
const { checkRequiredFields } = require('../../Controllers/checkRequiredFields')

const createMessage = async (req, res) => {

    if (checkRequiredFields(req.body, ['sender', 'receiver', 'message', 'chatRoomId'])) {

        let { sender, receiver, message, chatRoomId } = req.body

        let newMessage = new MessageSchema({
            sender: sender,
            receiver: receiver,
            message: message,
            chatRoomId: chatRoomId,
        })



        newMessage = await newMessage.save()

        // let data = await MessageSchema.findOne({ _id: newMessage._id }).populate(['sender', 'receiver'])

        res.send({ message: 'Message created', error: false, value: newMessage })


    }

    else {
        res.send({ message: 'Missing required field', error: true })
    }

}

module.exports.createMessage = createMessage

