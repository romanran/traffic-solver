require('./css/main.css')
const io = require('socket.io-client')
const socket = io.connect('http://localhost')
const Canvas = require('./js/Canvas')

window.onload = () => {
    socket.emit('loaded', true)
    const $canvas = document.getElementById('canvas')
    const canvas = window.Canvas = new Canvas($canvas, socket)
    canvas.listen()
    window.TSApp = canvas
}
