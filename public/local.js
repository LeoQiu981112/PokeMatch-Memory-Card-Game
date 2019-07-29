function shuffle_poke(){
    for(var i=0;i<18;i++){
        document.getElementById("location"+i).src="images/cardbg.png";
    }
    for(var i=0;i<18;i++){
        var a=Math.floor(Math.random()*18);
        var b=Math.floor(Math.random()*18);
        var temp=poke[a];
        poke[a]=poke[b];
        poke[b]=temp;
    }
}
var Local = function(socket) {
    shuffle_poke();
}