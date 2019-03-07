function showPic(whichpic){
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  var description = document.getElementById("description");
  var text = whichpic.getAttribute("title");
  description.firstChild.nodeValue = text;
  //placeholder.src = source;
}

function countBodyChildren(){
  var body_element = document.getElementsByTagName("body")[0];
  alert(body_element.nodeType);
}

// window.onload = countBodyChildren;
