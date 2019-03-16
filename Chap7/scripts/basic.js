window.onload = function(){
  // var testdiv = document.getElementById("testdiv");
  // testdiv.innerHTML = "<p> This is <em>this</em> content.</p>"
  // var para = document.createElement("p");
  // // var info = "nodeName: ";
  // // info+=para.nodeName;
  // // info+=" nodeType: ";
  // // info+=para.nodeType;
  // // alert(info);
  // var testdiv = document.getElementById("testdiv");
  // var txt = document.createTextNode("Hello World");
  // para.appendChild(txt);
  // testdiv.appendChild(para);

  var para = document.createElement("p");
  var txt1 = document.createTextNode("This is ");
  var emphasis = document.createElement("em");
  var txt2 = document.createTextNode("my");
  var txt3 = document.createTextNode(" content.");
  para.appendChild(txt1);
  emphasis.appendChild(txt2);
  para.appendChild(emphasis);
  para.appendChild(txt3);
  var textdiv = document.getElementById("testdiv");
  textdiv.appendChild(para);
}

function insertParagraph(text){
  var str = "<p>";
  str += text;
  str += "</p>";
  document.write(str);
}
