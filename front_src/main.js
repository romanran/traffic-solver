require('./css/main.css')
const io = require('socket.io-client')
const socket = io.connect('http://localhost')

socket.on('entities', function (data) {
    console.log(data)
}); 

class Solver {
    constructor() {

    }
    nextFrame() {
        socket.emit('ready', true)
        requestAnimationFrame(this.nextFrame.bind(this))
    }
}

window.onload = () => {
    const solver = window.Solver = new Solver()
    solver.nextFrame()
}
