const { model, Schema } = require('mongoose')

const UserSchema = model('User', Schema({

    username: { type: String, required: true },
    email: { type: String, required: true },
    password: {
        type: String,
        max: 1024,
        min: 6,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        required: true
    }

}, { timestamps: true }))


module.exports = UserSchema