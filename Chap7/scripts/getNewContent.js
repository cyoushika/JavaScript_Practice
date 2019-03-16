//window.onload  = getNewContent;

function getNewContent(){
  var request = getHTTPObject();
  if(request){
    //alert("We found something");
    //alert(request.responseText);
    request.open("GET","a.txt",true);
    request.onreadystatechange = function(){
      if(request.readyState==4 && request.status==200){
        alert("Response Received");
        var para = document.createElement("p");
        var txt = document.createTextNode(request.responseText);
        //alert(txt.nodeValue=='');
        para.appendChild(txt);
        var target = document.getElementById("new");
        if(target){
          target.appendChild(para);
        }
        else{
          alert("something wrong with target");
        }
      }
    }
    request.send();
  }else{
    alert("Sorry, your browser doesn\'t support XMLHttpRequest");
  }
  alert("Function Done")
}

addLoadEvent(getNewContent);
