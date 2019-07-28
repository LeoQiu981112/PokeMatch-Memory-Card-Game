var Game = function() {
    // dom元素 
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;
    // 分数
    var score = 0;
    // 游戏矩阵
    var gameData = [    // 整个游戏图形界面的2纬数组
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    // 当前方块
    var cur;
    // 下一个方块
    var next;
    // divs
    var nextDivs = [];
    var gameDivs = [];
    // 初始化div,参数：data二维数组、container要放入的页面位置、divs渲染的div块
    // 根据data内元素的值渲染container页面中的divs样式
    var initDiv = function(container,data,divs){  // 初始化渲染页面
        // 循环2纬数组
        for(var i=0; i<data.length; i++){
            var div = [];
            for(var j=0; j<data[0].length; j++){    // 每一个元素生成一个20*20小方格
                var newNode = document.createElement('div');
                newNode.className = 'none';
                // 每个方块的位置初始化
                newNode.style.top = (i*20) + 'px';
                newNode.style.left = (j*20) + 'px';
                // 把方块放入页面中
                container.appendChild(newNode);
                div.push(newNode);
            }
            // 压入一行
            divs.push(div);
        }
    }
    // 刷新div 参数：data二维数组 divs渲染的div块
    var refreshDiv = function(data,divs){   // 刷新时渲染页面
        for(var i=0; i<data.length; i++){
            for(var j=0; j<data[0].length; j++){
                if(data[i][j]==0){
                    divs[i][j].className = 'none';
                } else if(data[i][j]==1){
                    divs[i][j].className = 'done';
                } else if(data[i][j]==2){
                    divs[i][j].className = 'current';
                }
            }
        }
    }
    // 检测点是否合法，避免越界一直移动报错
    var check = function(pox, x, y){
        if(pox.x + x < 0){   // 超出上边界
            return false;
        } else if(pox.x + x >= gameData.length){  // 超出下边界
            return false;
        } else if(pox.y + y < 0){  // 超出左边界
            return false;
        } else if(pox.y + y >= gameData[0].length){  // 超出右边界
            return false;
        } else if(gameData[pox.x + x][pox.y + y] == 1){  //该位置已经有落下
            return false;
        }
        return true;
    }
    // 检查数据是否合法,避免图形一直下落消失
    var isValid = function(pos, data) {
        for(var i=0; i<data.length; i++){
            for(var j=0; j<data[0].length; j++){
                if(data[i][j] != 0){
                    if(!check(pos, i, j)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    // 清除数据
    var clearData = function(){
        for(var i=0; i<cur.data.length; i++){
            for(var j=0; j<cur.data[0].length; j++){
                if(check(cur.origin, i, j)){    // 如果该点合法（没超边界，没被落下覆盖），才清除数据
                    gameData[cur.origin.x + i][cur.origin.y + j]=0;
                }
            }
        }
    }
    // 设置数据
    var setData = function(){
        for(var i=0; i<cur.data.length; i++){
            for(var j=0; j<cur.data[0].length; j++){
                if(check(cur.origin, i, j)){    // 如果该点合法（没超边界，没被落下覆盖），才设置数据
                    gameData[cur.origin.x + i][cur.origin.y + j]=cur.data[i][j];
                }
            }
        }
    }
    // 下移
    var down = function() {
        if(cur.canDown(isValid)){
            clearData();    // 先清除图形界面
            cur.Down();   // 图形下位置+1
            setData();      // 设置位置
            refreshDiv(gameData,gameDivs);  // 刷新渲染
            return true;    //还能下降
        }else {
            return false;
        }
        
    }
    // 左移
    var left = function() {
        if(cur.canLeft(isValid)){
            clearData();    // 先清除图形界面
            cur.Left();   // 图形下位置+1
            setData();      // 设置位置
            refreshDiv(gameData,gameDivs);  // 刷新渲染
        }
        
    }
    // 右移
    var right = function() {
        if(cur.canRight(isValid)){
            clearData();    // 先清除图形界面
            cur.Right();   // 图形下位置+1
            setData();      // 设置位置
            refreshDiv(gameData,gameDivs);  // 刷新渲染
        }
        
    }
    // 旋转
    var rotate = function() {
        if(cur.canRotate(isValid)){
            clearData();    // 先清除图形界面
            cur.Rotate();   // 图形下位置+1
            setData();      // 设置位置
            refreshDiv(gameData,gameDivs);  // 刷新渲染
        }
        
    }
    // 方块移动到底部给它固定,这个点合法且空白就固定
    var fixed = function() {
        for(var i=0; i<cur.data.length; i++){
            for(var j=0; j<cur.data[0].length; j++){
                if(check(cur.origin, i, j)){
                    if(gameData[cur.origin.x + i][cur.origin.y + j] == 2){
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameData, gameDivs);
    }
    // 消行,从下面开始检查，有一行全为1就清楚，整体下移
    var checkClear = function()  {
        var line = 0;
        for(var i=gameData.length-1; i>0; i--){
            var clear = true;
            for(var j=0; j<gameData[0].length; j++){
                if(gameData[i][j]  != 1){
                    clear = false;
                    break;
                }
            }
            if(clear){  // 如果全为1就把这行上面的图形下移
                line = line + 1;
                for(var m=i; m>0; m--){
                    for(var n=0; n<gameData[0].length; n++){
                        gameData[m][n] = gameData[m-1][n];
                    }
                }   // 第一行清 0
                for(var n=0; n<gameData[0].length; n++){
                    gameData[0][n] = 0;
                }// 所有行下移到当前行，当前行重新判断
                i++;
            }
        }
        return line;
    }
    // 检查游戏结束,如果倒数第二行有固定数据，就游戏结束
    var checkGameOver = function() {
        var gameOver = false;
        for(var i=0; i<gameData[0].length; i++){
            if(gameData[1][i] == 1){
                gameOver = true;
            }
        }
        return gameOver;
    }
    // 使用下一个方块，把下一个设置为当前的，生成新的下一个
    var performNext = function(type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }
    // 设置时间
    var setTime = function(time) {
        timeDiv.innerHTML = time;
    }
    // 加分
    var addScore = function( line ) {
        var s = 0;
        switch(line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break;
            default:
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;
    }
    // 游戏结束
    var gameover = function(win) {
        if(win){
            resultDiv.innerHTML = '你赢了';
        } else {
            resultDiv.innerHTML = '你输了';
        }
    }
    // 底部增加行,干扰对方
    var addTailLines = function(lines) {
        for(var i=0; i<gameData.length - lines.length; i++){
            gameData[i] = gameData[i + lines.length];
        }
        for(var i=0; i<lines.length; i++){
            gameData[gameData.length - lines.length + i] = lines[i];
        }
        // 当前方块上移动
        cur.origin.x = cur.origin.x - lines.length;
        if(cur.origin.x < 0){
            cur.origin.x = 0;
        }
        refreshDiv(gameData, gameDivs);
    }
    // 初始化,界面元素，方块初始值和旋转次数
    var init = function(doms, type , dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        next = new SquareFactory.prototype.make(type , dir);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refreshDiv(next.data, nextDivs);
    }
    // 导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameover = gameover;
    this.addTailLines = addTailLines;
    this.fall = function(){
        // 如果还能下降就一直循环调用下降
        while(down());
    }
}