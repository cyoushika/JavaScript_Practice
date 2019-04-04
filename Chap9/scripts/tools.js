
addLoadEvent(styleHeaderSiblings);

function addLoadEvent(func){
  var oldonload = window.onload;
  if(typeof window.onload != 'function'){
    window.onload = func;
  }
  else{
    window.onload = function(){
      oldonload();
      func();
    }
  }
}
function tester(){
  var paras = document.getElementsByTagName("p");
  for(var i=0;i<paras.length;i++){
    paras[i].onclick = function(){
      alert("You clicked on a paragraph.")
    }
  }
}
