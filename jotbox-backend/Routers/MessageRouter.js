
const { createMessage } = require('../Controllers/MessageController/createMessage')
const { getRoomMessage } = require('../Controllers/MessageController/getRoomMessage')


const router = require('express').Router()

router.post('/', createMessage)
router.get('/:chatRoomId', getRoomMessage)

module.exports = router