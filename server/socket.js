const IO = require('socket.io');

module.exports = server => {
    const io = IO(server)
    io.on('connection', socket => {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}