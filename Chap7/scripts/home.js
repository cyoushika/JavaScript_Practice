
addLoadEvent(preparePlaceholder3);
addLoadEvent(prepareGallery);

function preparePlaceholder(){
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.jpg");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  document.getElementsByTagName("body")[0].appendChild(placeholder);
  document.getElementsByTagName("body")[0].appendChild(description);
}

function preparePlaceholder2(){
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.jpg");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  gallery.parentNode.insertBefore(placeholder,gallery);
  gallery.parentNode.insertBefore(description,gallery);
}

function preparePlaceholder3(){
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;

  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.jpg");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(placeholder,gallery);
  insertAfter(description,placeholder);
}

function insertAfter(newElement, targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }
  else{
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

function addLoadEvent(func){
  alert("yes");
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
