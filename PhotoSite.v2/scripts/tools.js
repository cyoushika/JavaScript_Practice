
addLoadEvent(prepareGallery);

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

function prepareGallery(){
  if(!document.getElementById || ! document.getElementsByTagName){
    return false;
  }

  if(!document.getElementById("imagegallery")){
    return false;
  }

  var elements = document.getElementById("imagegallery");
  var links = elements.getElementsByTagName("a");

  for(var i=0;i<links.length;i++){
    links[i].onclick = function(){
      return !showPic(this);
    }
    //links[i].onkeypress = links[i].onclick;
  }
}

function showPic(whichpic){
  var source = whichpic.getAttribute("href");
  if(!document.getElementById("placeholder")) return false;
  var placeholder = document.getElementById("placeholder");
  if(placeholder.nodeName != "IMG") return false;
  placeholder.setAttribute("src",source);
  if(document.getElementById("description")){
    var description = document.getElementById("description");
    if(whichpic.getAttribute("title")){
      var text = whichpic.getAttribute("title");
    }
    else{
      var text = "";
    }
    if(description.firstChild.nodeType == 3){
      description.firstChild.nodeValue = text;
    }
  }
  return true;
  //placeholder.src = source;
}
