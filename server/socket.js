const IO = require('socket.io');
const Solver = require('../solver/main')

function processTick(socket) {
    socket.emit('entities', Solver.Entities.list)
}

module.exports = server => {
    const io = IO(server)
    io.on('connection', socket => {

        Solver.Entities.init()

        socket.on('ready', function (data) {
            console.log('bla');
            
            process.nextTick(processTick.bind(this, socket))
        });
    });
}