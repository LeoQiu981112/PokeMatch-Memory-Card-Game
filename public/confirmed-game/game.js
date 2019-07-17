window.onload = function(){
    var gameimg = [
                    'images/start.png', 
                    'images/success.png',
                    'images/cardbg.jpg',
                  ];

    for(var i=1; i<=card.get_total(); i++){
        gameimg.push('images/card' + i + '.jpg');
    }

    var callback = function(){
        card.init();
    }

    img_preload(gameimg, callback);
	document.getElementById('restart').onclick=function(){
		window.location.href="index.html";	
	};
	
}

var card = (function(total,cardnum){

    var turntime = 5;                                 
    var carddata = [];                                
    var leveldata = [];                               
    var is_lock = 0;                                 
    var is_over = 0;                                  
    var first = -1;                                   
    var matchnum = 0;                         

    init = function(){
        tips('show');
        $('startgame').onclick = function(){
            tips('hide');
            start();
        }
    }

    start = function(){
        reset();
        create(cardnum);
        show();

        var curtime = -turntime;

        setHtml('livetime', curtime);
        
        var et = setInterval(function(){
           if(curtime==0){
                clearInterval(et);
                turnall();
                set_event();
				message('start', process);
                return ;
            }

            if(curtime==-turntime){
                turnall();
            }

            curtime++;
            setHtml('livetime', curtime);
        }, 1000)
    }

    create = function(n){
        carddata = [];
        leveldata = [];
        
        for(var i=1; i<=total; i++){
            carddata.push(i);
        }
    
        for(var i=0; i<n; i++){
            var curcard = carddata.splice(Math.random()*carddata.length, 1).pop();
            leveldata.push({'cardno':curcard,'turn':0}, {'cardno':curcard,'turn':0});
        }
        leveldata = shuffle(leveldata);
    }

    show = function(){
        var cardhtml = '';
        for(var i=0; i<leveldata.length; i++){
            cardhtml += '<div class="cardplane">';
            cardhtml += '<div class="card viewport-flip" id="card' + i + '">';
            cardhtml += '<div class="list flip out"><cavans style="position:absolute; width:142px; height:199px; background: url(images/card'+leveldata[i]['cardno'] + '.jpg);"></cavans></div>';//this is cavans Tag
            cardhtml += '<div class="list flip"><cavans style="position:absolute; width:142px; height:199px; background: url(images/cardbg.jpg);"></div>';
            cardhtml += '</div>';
            cardhtml += '</div>';

        }
        setHtml('gameplane', cardhtml);
    }

    turnall = function(){
        for(var i=0; i<leveldata.length; i++){
            turn_animate(i);
        }
    }

    turn_animate = function(key){
        var obj = $_tag('div', 'card' + key);
        var cardfont, cardback;
        
        if(getClass(obj[0]).indexOf('out')!=-1){
            cardfont = obj[0];
            cardback = obj[1];
        }else{
            cardfont = obj[1];
            cardback = obj[0];
        }

        setClass(cardback, 'list flip out');
        var et = setTimeout(function(){
            setClass(cardfont, 'list flip in');
        }, 225);
    }

    set_event = function(){
        var o = $_tag('div', 'gameplane');
        for(var i=0,count=o.length; i<count; i++){
            if(getClass(o[i])=='card viewport-flip'){
                o[i].onclick = function(){
                    turn(this.id);
                }
            }
        }
    }

    process = function(){

        is_lock = 0;

        var curtime =0;
        setHtml('livetime', curtime);

        var et = setInterval(function(){
            if(matchnum==cardnum){
                clearInterval(et);
                return ;
            }
            curtime++;
            setHtml('livetime', curtime);
        }, 1000);
    }

    message = function(type, callback){

        is_lock = 1;

        var message = $('message');
        var processed = 0;
        var opacity = 0;
        var soundtime = {
                    'start': 1500,
                    'success': 4000,
  
        };

        disp('message','show');
        setClass(message,'message_' + type);
        setOpacity(message, opacity);
        setPosition(message, 'left', 0);
        setPosition(message, 'top', 390);

        var et = setInterval(function(){
            var message_left = getPosition(message,'left');
            processed = processed + 25;

            if(processed>=500 && processed<=750){
                opacity = opacity+10;
                setPosition(message, 'left', message_left + 30);
                setOpacity(message, opacity);
            }else if(processed>=soundtime[type] && processed<=soundtime[type]+250){
                opacity = opacity-10;
                setPosition(message, 'left', message_left + 35);
                setOpacity(message, opacity);
            }else if(processed>soundtime[type]+250){
                disp('message','hide');
                clearInterval(et);
                if(typeof(callback)!='undefined'){
                    callback();
                }
            }

        },25);
    }

    turn = function(id){
        if(is_lock==1){
            return ;
        }

        var key = parseInt(id.replace('card',''));
    
        if(leveldata[key]['turn']==0){
            if(first==-1){
                turn_animate(key);
                first = key;
                leveldata[key]['turn'] = 1;
            }else{
                turn_animate(key);
                leveldata[key]['turn'] = 1;
                check_turn(key);
            }
        }

    }

    check_turn = function(key){
        is_lock = 1;

        if(leveldata[first]['cardno']==leveldata[key]['cardno']){
            matchnum ++;

            if(matchnum==cardnum){
                var et = setTimeout(function(){
                    message('success', process);
                }, 225);
            }

            first = -1;
            is_lock = 0;

        }else{

            var et = setTimeout(function(){
                    turn_animate(first);
                    leveldata[first]['turn'] = 0;
                    turn_animate(key);
                    leveldata[key]['turn'] = 0;

                    first = -1;
                    
                    if(is_over==0){
                        is_lock = 0;
                    }

                }, 300);
        }
    }

    tips = function(type){
        disp('tips', type);
    }

    get_total = function(){
        return total;
    }

    reset = function(){
        disp('process', 'show');
        setHtml('livetime', '');
        setHtml('gameplane', '');
        is_lock = 1;
        is_over = 0;
        first = -1;
        matchnum = 0;
    }

    return this;

})(10,9);

document.getElementById("account").onclick = function () {
    location.href = "https://stark-spire-21434.herokuapp.com/modify.html";
};

document.getElementById("back").onclick = function () {
    location.href = "https://stark-spire-21434.herokuapp.com/homepage.html";
};

$("#logout").click(function(){
    $.ajax({
        type:"get",
        url:"/logout",
        success:function(data){
            if(data.status==-1){
                location.href="https://stark-spire-21434.herokuapp.com/login.html";
            }
        },
         error:function(){
            alert("logout error!");
        }
    });
}); 
