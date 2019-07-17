//Reference: https://www.linuxidc.com/Linux/2017-02/140212.htm

function $(id) {
    return document.getElementById(id);
}


function $_tag(name, id) {
    if (typeof(id) != 'undefined') {
        return $(id).getElementsByTagName(name);
    } else {
        return document.getElementsByTagName(name);
    }
}

function setClass(obj, classname){
    if(typeof(obj)!='undefined'){
        obj.className = classname;
    }else{
        obj.className = '';
    }
}


function getClass(obj){
    var classname = '';
    if(typeof(obj)!='undefined'){
        classname = obj.className;
    }
    return classname;
}

function setHtml(id, val){
    var obj = document.getElementById(id);
    obj.innerHTML = val;
}

function getHtml(id){
    var obj = document.getElementById(id);
    return obj.innerHTML;
}


function disp(id, handle, classname) {
    if (handle == 'show') {
        $(id).style.display = 'block';
    } else {
        $(id).style.display = 'none';
    }
    if (typeof(classname) != 'undefined') {
        $(id).className = classname;
    }
}

function img_preload(img, callback) {
    var onload_img = 0;
    var tmp_img = [];
    for (var i = 0, imgnum = img.length; i < imgnum; i++) {
        tmp_img[i] = new Image();
        tmp_img[i].src = img[i];
        if (tmp_img[i].complete) {
            onload_img++;
        } else {
            tmp_img[i].onload = function() {
                onload_img++;
            }
        }
    }
    var et = setInterval(
        function() {
            if (onload_img == img.length) {
                clearInterval(et);
                callback();
            }
        }, 200);
}


function in_array(str, arr) {
    for (var i = 0, max = arr.length; i < max; i++) {
        if (str == arr[i]) {
            return true;
        }
    }
    return false;
}


function shuffle(arr){
    var tmparr = [];
    var num = arr.length;
    for(var i=0; i<num; i++){
        tmparr.push(arr.splice(Math.random()*arr.length,1).pop());
    }
    return tmparr;
}

function setPosition(obj, type, val) {
    switch (type) {
    case 'top':
        obj.style.top = val + 'px';
        break;
    case 'left':
        obj.style.left = val + 'px';
        break;
    }
}


function getPosition(obj, type) {
    var val = 0;
    switch (type) {
    case 'top':
        val = obj.style.top;
        break;
    case 'left':
        val = obj.style.left;
        break;
    }
    return parseInt(val);
}


function setOpacity(obj, val) {
    obj.style.filter = "alpha(opacity=" + val + ")";
    obj.style.opacity = parseFloat(val / 100);
}


function getDefaultStyle(obj, attribute, covert) {
    var attribute = obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj, false)[attribute];
    if(covert==1){
        attribute = parseInt(attribute);
    }
    return attribute;
}
