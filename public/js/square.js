var Square = function() {
     // 方块数据
     this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    // 原点
    this.origin = {
        x: 0,
        y: 0
    }
    // 方向  旋转数组的索引
    this.dir = 0;  
}
// 判断旋转移是否合法
Square.prototype.canRotate = function(isValid) {
    var d = (this.dir + 1)%4;
    // test 是下一种变化的形状
    var test = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    // test 将下一种变化的形状赋给test
    for(var i=0; i<this.data.length; i++){
        for(var j=0; j<this.data[0].length; j++){
            test[i][j] = this.rotates[d][i][j]
        }
    }
    // 原点不变，传下一变化数据
    return isValid(this.origin, test);
}
// 旋转
Square.prototype.Rotate = function(num) {
    if(!num) num = 1;
    this.dir = (this.dir + num)%4;
    // 将下一种变化的形状赋给this.data
    for(var i=0; i<this.data.length; i++){
        for(var j=0; j<this.data[0].length; j++){
            this.data[i][j] = this.rotates[this.dir][i][j]
        }
    }
}

// 判断下降是否合法
Square.prototype.canDown = function(isValid) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    // 原点下降，传同数据
    return isValid(test, this.data);
}
// 下降
Square.prototype.Down = function() {
    this.origin.x = this .origin.x + 1;
}

// 判断左移是否合法
Square.prototype.canLeft = function(isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data);
}
// 左移
Square.prototype.Left = function() {
    this.origin.y = this .origin.y - 1;
}

// 判断右移是否合法
Square.prototype.canRight = function(isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data);
}
// 右降
Square.prototype.Right = function() {
    this.origin.y = this .origin.y + 1;
}