const { model, Schema, mongo, default: mongoose } = require('mongoose')

const ChatRoomSchema = model('ChatRoom', Schema({

    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomName: { type: String }

}, { timestamps: true }))


module.exports = ChatRoomSchema

