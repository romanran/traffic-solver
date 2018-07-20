require('./css/main.css')
const io = require('socket.io-client')
const socket = io.connect('http://localhost')

socket.on('news', function (data) {
    console.log(data)
    socket.emit('my other event', { my: 'data' })
}); 