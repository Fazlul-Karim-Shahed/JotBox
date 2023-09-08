const { createChatRoom } = require('../Controllers/ChatRoomController/createChatRoom')


const router = require('express').Router()

router.post('/:user1/:user2', createChatRoom)

module.exports = router