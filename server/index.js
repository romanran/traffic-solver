const express = require('express');
const app = express();
const server = require('http').Server(app);
const opn = require('opn');

app.listen(80);

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/html/index.html');
});

app.use('/public', express.static(__dirname + '/html/public'));

const socket = require('./socket')
socket(server)
opn('localhost', {app: ['chrome']});
