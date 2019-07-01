// var a = 0;
// var i = setInterval(function(){
//   console.log("hello " + a);
//   a++;
//   if (a == 5)
//     clearInterval(i);
// }, 3000);

// setTimeout(function(){
//   console.log("hello");
// }, 0);
//
// console.log("world");

//// --- event handler --- //
// var a = document.getElementById("demo");
// a.onclick = runCommand;
// function runCommand(ev){
//   this.innerHTML = "<b>type: " + ev.type +" button: " + ev.button+"</b>";
// }
//
// a.onclick = runCommand2;
// function runCommand2(ev){
//   console.log("Hello");
// }

// --- event listener --- //

window.addEventListener('click', function(){
  console.log("Hello");
})
window.addEventListener('click', runCommand2)
function runCommand2(){
  console.log("World");
})
// window.removeEventListener('click', runCommand2)
window.addEventListener('keypress', function(ev){
  console.log(ev.keyCode);
})

// -----------
