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
var remote_poke;
socket.on('start', function() {
    shuffle_poke();
    socket.emit('init', {remote_poke:poke});
})

socket.on('init', function(data) {
    for(var i=18;i<36;i++){
        document.getElementById("location"+i).src="images/cardbg.png";
    }
    remote_poke = data.poke;
})

socket.on('up', function(data) {
    remote_id = data.remote_id + 18;
    document.getElementById("location"+remote_id).src="images/eevee/card"+remote_poke[id]+".jpg";

    for(var i=18;i<36;i++){
        document.getElementById("location"+i).src="images/cardbg.png";
    }
    remote_poke = data.poke;
})
