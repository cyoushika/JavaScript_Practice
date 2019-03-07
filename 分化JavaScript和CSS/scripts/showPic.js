window.onload = prepareLinks;

function showPic(whichpic){
  var source = whichpic.getAttribute("herf");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  var text = whichpic.getAttribute("title");
  var description = document.getElementById("description");
  description.firstChild.nodeValue = text;
}

function prepareLinks(){
  if (!document.getElementsByTagName) return false;
  var links = document.getElementsByTagName("a");
  for(var i=0;i<links.length;i++){
    if(links[i].getAttribute("class")=="popup"){
      links[i].onclick = function(){
        popUp(this.getAttribute("href"));
        return false;
      }
    }
  }
}

function popUp(whichlink){
  window.open(whichlink,"popup","width=320,height=480");//(URL, Name, Attributes)
}
