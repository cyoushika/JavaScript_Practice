
function addLoadEvent(func){
  //alert("add Load Event!");
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
