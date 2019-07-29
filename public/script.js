var socket = io();

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

socket.on('start', function() {
    shuffle_poke();
    socket.emit('init');
})

socket.on('init', function() {
    for(var i=18;i<36;i++){
        document.getElementById("location"+i).src="images/cardbg.png";
    }
})
