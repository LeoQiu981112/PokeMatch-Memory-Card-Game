var Local = function(socket) {
    // 游戏对象
    var game;
    // 时间间隔
    var INTERVAL = 200;
    // 定时器
    var timer = null;
    // 时间计数器
    var timeCount = 0;
    // 时间
    var time = 0;

    // 绑定键盘事件
    var bindKeyEvent = function() {
        document.onkeydown = function(e){
            if(e.keyCode == 38){ //up
                game.rotate();
                socket.emit('rotate');
            } else if(e.keyCode == 39){ //right
                game.right();
                socket.emit('right');
            } else if(e.keyCode == 40){ //down
                game.down();
                socket.emit('down');
            } else if(e.keyCode == 37){ //left
                game.left();
                socket.emit('left');
            } else if(e.keyCode == 32){ //space
                game.fall();
                socket.emit('fall');
            } 
        }
    }
    // 移动
    var move = function() {
        timeFunc();
        if(!game.down()){   // 如果不能下降，固定
            game.fixed();
            socket.emit('fixed');
            // 固定后消行逻辑
            var line = game.checkClear();
            if(line){   // 本次消行行数不为0，加分
                game.addScore(line);
                socket.emit('line', line);
                if(line > 1){
                    var bottomLines = generataBottomLine(line);
                    socket.emit('bottomLines', bottomLines);
                }
            }
            // 游戏结束逻辑
            var gameOver = game.checkGameOver();
            if(gameOver){
                game.gameover(false);
                document.getElementById('remote_gameover').innerHTML = '你赢了'
                socket.emit('lose');
                stop();
            } else {
                // 设置下一个下落方块和准备区的方块(种类和旋转次数)
                var t = generateType();
                var d = generateDir();
                game.performNext(t, d);
                socket.emit('next',{type:t, dir:d});
            } 
        } else {    // down成功发送一个down消息
            socket.emit('down');
        }
    }
    // 随机生成干扰行,n行干扰行
    var generataBottomLine = function(lineNum) {
        var lines = [];
        for(var i=0; i<lineNum; i++){
            var line = [];
            for(var j=0; j<10; j++){    // 一行干扰行
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
    }
    // 计时函数
    var timeFunc = function() {
        timeCount = timeCount + 1;  // move函数200ms运行一次
        if(timeCount == 5){
            timeCount = 0;
            time = time + 1;
            game.setTime(time);
            socket.emit('time', time)
        }
    }
    // 随机生成一个方块种类
    var generateType = function() {
        return Math.ceil(Math.random() * 7 - 1);
    }
    var generateDir = function() {
        return Math.ceil(Math.random() * 4 - 1);
    }
    // 开始方法
    var start = function() {
        var doms = {    // 界面元素
            gameDiv:document.getElementById('local_game'),
            nextDiv:document.getElementById('local_next'),
            timeDiv:document.getElementById('local_time'),
            scoreDiv:document.getElementById('local_score'),
            resultDiv:document.getElementById('local_gameover')
        }
        game = new Game();
        var type = generateType();
        var dir = generateDir();
        // 传入界面元素和next方块的初始值(类型、旋转次数)
        game.init(doms, type, dir);
        // 把初始值传给服务器以便对方显示
        socket.emit('init', {type: type, dir:dir})
        bindKeyEvent();
        // 使用next设置当前并生成新的next
        var t = generateType();
        var d = generateDir();
        game.performNext(t, d);
        socket.emit('next',{type:t, dir:d});
        timer = setInterval(move, INTERVAL)
    }
    // 结束
    var stop = function() {
        if(timer){  // 关闭计时器
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null; //清除键盘事件
    }

    socket.on('start', function(){
        //document.getElementById('waiting').innerHTML = '';
        start();
    })
    socket.on('lose',function() {
        game.gameover(true);
        stop();
    })
    socket.on('leave', function(){
        stop();
    })
    socket.on('bottomLines', function(data){
        game.addTailLines(data);
        socket.emit('addTailLines',data)
    })
    
}