
var neusoft={};
neusoft.matchingGame={};
neusoft.matchingGame.cardWidth=80;//牌宽
neusoft.matchingGame.cardHeight=120;
neusoft.matchingGame.deck=
    [
        "cardAK","cardAK",
        "cardAQ","cardAQ",
        "cardAJ","cardAJ",
        "cardBK","cardBK",
        "cardBQ","cardBQ",
        "cardBJ","cardBJ"
    ]

//start timer

window.onload = function () {
  var count = 0;
  //var bt = document.getElementById("bt");
  function show(){
    document.getElementById("timer").innerHTML = count + 1;
    count =count +1;
  }
  var flag = setInterval(show, 1000);
  
}

//random shuffle, return 1 or -1
function shuffle()
{
    //Math.random能返回0~1之间的数
    return Math.random()>0.5 ? -1 : 1
}

//flip cards
function selectCard() {
    var $fcard=$(".card-flipped");
    //return after flipped two cards
    if($fcard.length>1)
    {
        return;
    }
    $(this).addClass("card-flipped");

    // check whether same after flipped two cards
    var $fcards=$(".card-flipped");
    if($fcards.length==2)
    {
        setTimeout(function(){
        checkPattern($fcards);},700);
    }
}

//check whether two cards are same
function checkPattern(cards)
{
    var pattern1 = $(cards[0]).data("pattern");
    var pattern2 = $(cards[1]).data("pattern");

    $(cards).removeClass("card-flipped");
    if(pattern1==pattern2)
    {
        $(cards).addClass("card-removed")
            .bind("webkitTransitionEnd",function(){
                $(this).remove();
    });
    }
}

