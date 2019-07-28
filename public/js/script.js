var socket = io();
var local = new Local(socket);
var remote = new Remote(socket);

socket.on('waiting', function(str) {
    document.getElementById('waiting').innerHTML = str;
})
socket.on('ready', function(str) {
    document.getElementById('ready').innerHTML = str;
    $("#5togoshow").show();
    var i = 5;      
    var intervalid; 
    intervalid = setInterval("fun()", 1000); 
    function fun() { 
        if (i == 0) { 
            $("#startpage").hide();
            clearInterval(intervalid); 
        }    
        document.getElementById("mes").innerHTML = i; 
        i--; 
    } 
})

//socket.on('5togo', function(){
//    var i = 5; 
//    $("#5togoshow").show(); 
///    var intervalid; 
//    intervalid = setInterval("fun()", 1000); 
//    function fun() { 
//        if (i == 0) { 
//            $("#startpage").hide();
//            clearInterval(intervalid); 
//        }    
//        document.getElementById("mes").innerHTML = i; 
//        i--; 
//    }       
//})