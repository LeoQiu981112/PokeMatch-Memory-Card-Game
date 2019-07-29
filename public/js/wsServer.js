// 创建一个http的服务器
var app = require('http').createServer()
// 把http封装成io对象
var io = require('socket.io')(app);
var PORT = 3000;

app.listen(3000);
 
// 客户端计数
var clientCount = 0;

// 用来存储客户端socket
var socketMap = {};

var bindListener = function(socket, event){
    socket.on(event, function(data){
        if(socket.clientNum % 2 == 0){
            if(socketMap[socket.clientNum - 1]){
                socketMap[socket.clientNum - 1].emit(event,data);
            }
        } else {
            if(socketMap[socket.clientNum + 1]){
                socketMap[socket.clientNum + 1].emit(event,data);
            }
        }
    })
}

io.on('connection', function(socket){
  
    clientCount = clientCount + 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;
    // 第一个用户进来让其等待配对
    if(clientCount % 2 == 1){
        socket.emit('waiting','waiting for another person');
    } else {    // 每对的第二个进来给他们发送开始消息
        // 如果不存在了说明掉线了
        if(socketMap[socket.clientNum - 1]){
            socket.emit('start');
            socketMap[(clientCount - 1)].emit('start');
        } else {
            socket.emit('leave');
        }
    }

    // 把一方的初始值发送给另一方显示
    // socket.on('init', function(data){
    //     if(socket.clientNum % 2 == 0){
    //         socketMap[socket.clientNum - 1].emit('init',data);
    //     } else {
    //         socketMap[socket.clientNum + 1].emit('init',data);
    //     }
    // })
    // 简化
    bindListener(socket,'init');
    bindListener(socket,'next');
    bindListener(socket,'rotate');
    bindListener(socket,'right');
    bindListener(socket,'down');
    bindListener(socket,'left');
    bindListener(socket,'fall');
    bindListener(socket,'fixed');
    bindListener(socket,'line');
    bindListener(socket,'time');
    bindListener(socket,'lose');
    bindListener(socket,'bottomLines');
    bindListener(socket,'addTailLines');
    
    
    
    socket.on('disconnect', function(){
        if(socket.clientNum % 2 == 0){
            if(socketMap[socket.clientNum - 1]){
                socketMap[socket.clientNum - 1].emit('leave');
            }
        } else {
            if(socketMap[socket.clientNum + 1]){
                socketMap[socket.clientNum + 1].emit('leave');
            }
        }
        delete(socketMap[socket.clientNum]);
    })
})

console.log('websocket listening on port ' + PORT);