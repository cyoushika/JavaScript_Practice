function addLoadEvent(func){
  //alert("yes");
  var oldonload = window.onload;
  if(typeof window.onload !='function'){
    window.onload = func;
  }
  else{
    window.onload = function(){
      oldonload();
      func();
    }
  }
}
