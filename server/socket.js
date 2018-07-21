const IO = require('socket.io');
const Solver = require('../solver/main')

function processTick(socket) {
    socket.emit('entities_pos', Solver.Entities.position)
}
Solver.Entities.init()

module.exports = server => {
    const io = IO(server)
    io.on('connection', socket => {
        socket.on('loaded', () => {
            socket.emit('init', Solver.Entities.list)
        })
        socket.on('ready', function (data) {
            process.nextTick(processTick.bind(this, socket))
        });
    });
}