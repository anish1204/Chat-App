const path = require('path')
const Filter = require('bad-words')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app=express();
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))


io.on('connection',(socket)=>{
    console.log('New WebSocket Connnection');

    socket.emit('message','Welcome!')
    socket.broadcast.emit('message','A new User Has joined')

    socket.on('sendMessage',(message,callback)=>{
        const filter = new Filter()

        if(filter.isProfane(message))
        {
            return callback('Profanity is not allowed')
        }


        io.emit('message',message)
        callback()
    })

    socket.on('disconnect',()=>{
        io.emit('message','A user has left')
    })


    socket.on('sendLocation',(coords,callback)=>{
       io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })
    

})

server.listen(3000,()=>{
    console.log('Serving on port 3000');
})