function getHTTPObject(){
  //alert("We are trying to get something");
  if(typeof XMLHttpRequest == "undefined"){
    XMLHttpRequest = function(){
      try{
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      }
      catch(e){}
      try{
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
      }
      catch(e){}
      try{
        return new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch(e){}
      return false;
    }
  }
  else if(window.XMLHttpRequest){
    return new XMLHttpRequest();
  }
  return new XMLHttpRequest();
}
