var poke=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
var number=Math.ceil(Math.random()*10);
poke.splice((number-1)*2,2);
var flag=false;
var oneid=-1;
var count=0;
function poker(id){
    count++;
    if(poke[id]==-1){
        return;
    }
    document.getElementById("location"+id).src="images/eevee/card"+poke[id]+".jpg";
    if(flag){
        if(poke[id]==poke[oneid]){
            poke[id]=-1;
            poke[oneid]=-1;
        }
        else{
            setTimeout("fail("+id+","+oneid+")",600);
        }
        oneid=-1;
        flag=false;
    }
    else{
        oneid=id;
        flag=true;
    }
    check_success();
}
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
function fail(id, oneid){
    document.getElementById("location"+id).src="images/cardbg.png";
    document.getElementById("location"+oneid).src="images/cardbg.png";
}
function check_success(){
    for(var i=0;i<18;i++){
        if(poke[i]!=-1)
            return;
    }
    $("#box").show();
    document.getElementById("steps").innerHTML=count;
}
socket.on('start', function(){
    shuffle_poke();
    //console.log(poke);
    //socket.emit('init')
})
