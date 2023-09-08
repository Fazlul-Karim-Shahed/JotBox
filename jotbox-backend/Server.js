
require('express-async-errors')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')
const UserRouter = require('./Routers/UserRouter')
const ChatRoomRouter = require('./Routers/ChatRoomRouter')
const MessageRouter = require('./Routers/MessageRouter')


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));

let server = http.createServer(app)
let io = new Server(server, {
    cors: {
        // origin: 'http://localhost:3000',
        origin: 'https://jot-box.web.app',
        methods: ['GET', 'POST']
    }

})

global.io = io


const DATABASE = process.env.MONGODB_DATABASE.replace('<password>', process.env.MONGODB_PASS)

mongoose.connect(DATABASE).then(() => {
    console.log('Connected to Mongodb Server Successfully')
})

const port = 1229


app.use('/api/chatroom', ChatRoomRouter)
app.use('/api/message', MessageRouter)
app.use('/api/user', UserRouter)
app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Something went wrong', error: true })
})


app.get('/', (req, res) => {
    res.send('Welcome to JotBox Project')
})

io.on('connection', (socket) => {
    console.log('User connected ', socket.id)

    socket.on('join_room', id => {
        socket.join(id)
        console.log('Joined room ', id)
    })

    socket.on('message', data => {
        console.log(data)
        socket.to(data.chatRoomId).emit('reply', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected ', socket.id)
    })

})


server.listen(port, () => {
    console.log(`Connected to port ${port}.`)
})
