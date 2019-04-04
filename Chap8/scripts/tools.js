addLoadEvent(displayAbbravations);
addLoadEvent(displayCite);
addLoadEvent(displayAccesskeys);

function addLoadEvent(event){
  var lastevent = window.onload;
  if(typeof lastevent != "function"){
    window.onload=event;
  }
  else{
    window.onload = function(){
      lastevent();
      event()
    }
  }
}

function displayAbbravations(){

  if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  //获得缩略词汇
  var abbreviations = document.getElementsByTagName("abbr");

  if(abbreviations.lenght <1){
    //alert("Nothing to do here");
    return false;
  }

  var defs = new Array();
  //alert(abbreviations.length)

  //遍历所有缩略词
  for(var i=0;i<abbreviations.length;i++){
    //alert(i);
    var current_abbr = abbreviations[i];
    //如果当前元素没有子节点，就立刻开始下一次循环）
    if (current_abbr.childNodes.length<1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }

  //创建每个缩略词的dt和dd,并添加到dl里
  var dlist = document.createElement("dl");
  for(key in defs){
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if(dlist.childNodes.length<1) return false;

  var header = document.createElement("h2");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);

  document.getElementsByTagName("body")[0].appendChild(header);
  document.getElementsByTagName("body")[0].appendChild(dlist);

}

function displayCite(){
  if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  //取得所有引用
  var quotes = document.getElementsByTagName("blockquote");
  if(quotes.length < 1) return false;

  //遍历所有引用
  for(var i=0;i<quotes.length;i++){
    if(!quotes[i].getAttribute("cite")){
      continue;
    }

    //获取cite
    var url = quotes[i].getAttribute("cite");

    //获取所有元素子节点
    var quoteChildren = quotes[i].getElementsByTagName("*");
    if(quoteChildren.length<1) continue;
    var elem = quoteChildren[quoteChildren.length-1];

    //创建标记
    var link = document.createElement("a");
    var link_text = document.createTextNode("source");
    link.appendChild(link_text);
    link.setAttribute("href",url);
    var superscript = document.createElement("sup");
    superscript.appendChild(link);
    //添加标记到最后一个元素节点上
    elem.appendChild(superscript);
  }
}

function displayAccesskeys(){
  if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var links = document.getElementsByTagName("a");
  var akeys = new Array();

  for(var i=0;i<links.length;i++){
    var current_link = links[i];
    if(!current_link.getAttribute("accesskey")) continue;
    var key = current_link.getAttribute("accesskey");
    var text = current_link.lastChild.nodeValue;
    akeys[key] = text;
  }
  var list = document.createElement("ul");
  for(key in akeys){
    var text = akeys[key];
    var str = key+":"+text;
    var item = document.createElement("li");
    var item_text = document.createTextNode(str);
    item.appendChild(item_text);
    list.appendChild(item);
  }

  var header = document.createElement("h3");
  var header_text = document.createTextNode("Accesskeys");
  header.appendChild(list);
  document.body.appendChild(header);
  document.body.appendChild(list);
}
