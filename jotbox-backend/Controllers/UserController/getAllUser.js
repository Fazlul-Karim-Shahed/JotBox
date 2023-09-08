
const _ = require('lodash')
const UserSchema = require('../../Schemas/UserSchema')

const getAllUser = async (req, res) => {

    let user = await UserSchema.find()

    if (user.length === 0) {
        res.send({ message: 'No user found', error: true })
    }

    else {
        res.send({ message: user.length + ' User found', error: false, data: user })
    }




}

module.exports.getAllUser = getAllUser

