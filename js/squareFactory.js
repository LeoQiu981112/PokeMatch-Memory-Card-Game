var Square1 = function() {
    // 继承square的共有部分
    Square.call(this);  
    // 旋转数组
    this.rotates = [
       [
           [0, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 2, 0, 0]
       ],
       [
           [0, 0, 0, 0],
           [2, 2, 2, 2],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [0, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 2, 0, 0]
       ],
       [
           [0, 0, 0, 0],
           [2, 2, 2, 2],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ]
    ]
}
Square1.prototype = Square.prototype;


var Square2 = function() {
    Square.call(this);
   // 旋转数组
   this.rotates = [
       [
           [0, 2, 0, 0],
           [2, 2, 2, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [0, 2, 0, 0],
           [0, 2, 2, 0],
           [0, 2, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 2, 2, 0],
           [0, 2, 0, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [0, 2, 0, 0],
           [2, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 0, 0, 0]
       ]
   ]
}
Square2.prototype   = Square.prototype;
  

var Square3 = function() {
    Square.call(this);
   // 旋转数组
   this.rotates = [
       [
           [2, 2, 2, 0],
           [0, 0, 2, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [0, 2, 0, 0],
           [0, 2, 0, 0],
           [2, 2, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 0, 0, 0],
           [2, 2, 2, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 2, 0, 0],
           [2, 0, 0, 0],
           [2, 0, 0, 0],
           [0, 0, 0, 0]
       ]
   ]
}
// 判断旋转移是否合法
Square3.prototype   = Square.prototype;


var Square4 = function() {
    Square.call(this);
   // 旋转数组
   this.rotates = [
       [
           [2, 2, 2, 0],
           [2, 0, 0, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [0, 0, 2, 0],
           [2, 2, 2, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 0, 0, 0],
           [2, 0, 0, 0],
           [2, 2, 0, 0],
           [0, 0, 0, 0]
       ]
   ]
}
// 判断旋转移是否合法
Square4.prototype   = Square.prototype;
   

var Square5 = function() {
    Square.call(this);
   // 旋转数组
   this.rotates = [
       [
           [2, 2, 0, 0],
           [2, 2, 0, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 2, 0, 0],
           [2, 2, 0, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 2, 0, 0],
           [2, 2, 0, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 2, 0, 0],
           [2, 2, 0, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ]
   ]
}
// 判断旋转移是否合法
Square5.prototype   = Square.prototype;
   

var Square6 = function() {
    Square.call(this);
   // 旋转数组
   this.rotates = [
       [
           [0, 2, 2, 0],
           [2, 2, 0, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 0, 0, 0],
           [2, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [0, 2, 2, 0],
           [2, 2, 0, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 0, 0, 0],
           [2, 2, 0, 0],
           [0, 2, 0, 0],
           [0, 0, 0, 0]
       ]
   ]
}
// 判断旋转移是否合法
Square6.prototype   = Square.prototype;


var Square7 = function() {
    Square.call(this);
   // 旋转数组
   this.rotates = [
       [
           [2, 2, 0, 0],
           [0, 2, 2, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [0, 2, 0, 0],
           [2, 2, 0, 0],
           [2, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [2, 2, 0, 0],
           [0, 2, 2, 0],
           [0, 0, 0, 0],
           [0, 0, 0, 0]
       ],
       [
           [0, 2, 0, 0],
           [2, 2, 0, 0],
           [2, 0, 0, 0],
           [0, 0, 0, 0]
       ],
   ]
}
// 判断旋转移是否合法
Square7.prototype   = Square.prototype;


var SquareFactory = function() {}
// index 方块种类  dir旋转方向
SquareFactory.prototype.make = function(index, dir) {
    var s;
    index = index + 1;
    switch(index){
        case 1:
            s = new Square1();
            break;
        case 2:
            s = new Square2();
            break;
        case 3:
            s = new Square3();
            break;
        case 4:
            s = new Square4();
            break;
        case 5:
            s = new Square5();
            break;
        case 6:
            s = new Square6();
            break;
        case 7:
            s = new Square7();
            break;
        default:
            break;
    }
    // 刚出现的初始位置
    s.origin.x = 0;
    s.origin.y = 3;
    // s方块旋转dir次
    s.Rotate(dir);
    return s;
}