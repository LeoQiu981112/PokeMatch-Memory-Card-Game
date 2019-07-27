var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const PORT = process.env.PORT || 5000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chatroom.html');
});

io.sockets.on('connection', function(socket){
	socket.on('send message', function(mes){
		io.sockets.emit('new message', mes);
		// socket.broadcast.emit('new message', mes);
	});
});

server.listen(PORT, () => console.log(`Listening on ${ PORT }`));


