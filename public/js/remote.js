// 对方游戏区域
console.log("test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
var Remote = function(socket){
    // 游戏对象
    var game;
    // 绑定按钮事件
    var bindEvents = function() {
        socket.on('init', function(data){
            console.log("test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(data.type);
            console.log(data.dir);
            start(data.type, data.dir);
        })

        socket.on('next', function(data){
            game.performNext(data.type, data.dir);
        })
        
        socket.on('rotate', function(data){
            game.rotate();
        })

        socket.on('right', function(data){
            game.right();
        })

        socket.on('down', function(data){
            game.down();
        })

        socket.on('left', function(data){
            game.left();
        })

        socket.on('fall', function(data){
            game.fall();
        })

        socket.on('fixed', function(data){
            game.fixed();
        })

        socket.on('line', function(data){
            game.checkClear();
            game.addScore(data);
        })

        socket.on('time', function(data){
            game.setTime(data);
        })

        socket.on('lose', function(data){
            game.gameover(false);
        })

        socket.on('leave', function(){
            document.getElementById('local_gameover').innerHTML = '对方掉线';
            document.getElementById('remote_gameover').innerHTML = '已掉线';
            stop();
        })
        
        socket.on('addTailLines', function(data){
            game.addTailLines(data);
        })
    }
    // 开始
    var start = function(type, dir){
        var doms = {    // 界面元素
            gameDiv:document.getElementById('remote_game'),
            nextDiv:document.getElementById('remote_next'),
            timeDiv:document.getElementById('remote_time'),
            scoreDiv:document.getElementById('remote_score'),
            resultDiv:document.getElementById('remote_gameover')
        }
        game = new Game();
        // 传入界面元素和next方块的初始值(类型、旋转次数)
        game.init(doms, type, dir);
    }
    var stop = function() {
        document.onkeydown = null; //清除键盘事件
    }
    bindEvents();
}