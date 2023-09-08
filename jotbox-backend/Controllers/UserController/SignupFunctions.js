
const _ = require('lodash')
const UserSchema = require('../../Schemas/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const Signup = async (req, res) => {


    let data = await UserSchema.findOne({ email: req.body.email })
    if (data) {
        res.send({ message: 'User already exist', error: true })
    }
    else {

        data = _.pick(req.body, ['username', 'email', 'password']);
        let salt = await bcrypt.genSalt(10)
        let hashedPass = await bcrypt.hash(data.password, salt)

        data = new UserSchema({
            username: data.username,
            email: data.email,
            password: hashedPass,
        })

        data = data.save().then(data => {

            const token = jwt.sign(_.pick(data, ['username', 'role', 'email', '_id']), process.env.JWT_KEY, { expiresIn: '1h' })
            res.send({
                message: 'Registration complete', error: false, value: {
                    token: token
                }
            })
        })
            .catch(err => {
                res.send({ message: 'Something went wrong while signup', error: true, value: err.message })
            })


    }

}

module.exports.Signup = Signup

