
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const UserSchema = require('../../Schemas/UserSchema')
const bcrypt = require('bcrypt')


const Signin = async (req, res) => {


    let user = await UserSchema.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
        res.send({ message: 'User not found', error: true })
    }
    else {

        let checked = await bcrypt.compare(req.body.password, user.password)
        if(checked){
            const token = jwt.sign(_.pick(user, ['username', 'role', 'email', '_id']), process.env.JWT_KEY, {expiresIn: '1h'})
            res.send({ message: 'Signin compete', error: false, value: {
                token: token
            } })
        }
        else{
            res.send({ message: 'Password not matched', error: true })
        }

    }

}

module.exports.Signin = Signin

