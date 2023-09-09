const { model, Schema, mongo, default: mongoose } = require('mongoose')

const MessageSchema = model('Message', Schema({

    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
    sendingTime: {
        type: String,
        default: `${new Date().toDateString().slice(4, -4)} AT ${new Date().toLocaleString().slice(10,)} `
    }

}, { timestamps: true }))


module.exports = MessageSchema