var socket = io();
var local = new Local(socket);
var remote = new Remote(socket);

socket.on('waiting', function(str) {
    document.getElementById('waiting').innerHTML = str;
})
socket.on('ready', function(str) {
    document.getElementById('ready').innerHTML = str;
    $("#3togoshow").show();
    var i = 3;      
    var intervalid; 
    function fun() { 
        if (i == 0) { 
            $("#startpage").hide();
            clearInterval(intervalid); 
        }    
        document.getElementById("mes").innerHTML = i; 
        i--; 
    } 
    intervalid = setInterval(fun, 1000); 
    
})
