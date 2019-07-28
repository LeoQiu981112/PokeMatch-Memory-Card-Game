var socket = io();
var local = new Local(socket);
var remote = new Remote(socket);

socket.on('waiting', function(str) {
    document.getElementById('waiting').innerHTML = str;
})
socket.on('ready', function(str) {
    document.getElementById('ready').innerHTML = str;
})