addLoadEvent(prepareSlideshow);

function prepareSlideshow(){
  //确保浏览器支持DOM方法
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById("linklist")) return false;
  //优化list.html，即把div从html里面分离，因为只是为了动画效果才加进来的。只有在js有用的时候，再让它出现会更加合理
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");

  var preview = document.createElement("img");
  preview.setAttribute("src","images/topic.png");
  preview.setAttribute("alt","building blocks of web design");
  preview.setAttribute("id","preview");

  slideshow.appendChild(preview);

  var list = document.getElementById("linklist");
  insertAfter(slideshow,list);
  // //确保元素存在

  // if(!document.getElementById("preview")) return false;
  // //为图片提供样式
  // var preview = document.getElementById("preview");
  // preview.style.position = "absolute";

  //因为在moveElement里面检查了元素的位置属性，所以不需要在此声明了
  //preview.style.left = "0px";
  //preview.style.top = "0px";

  //获得列表里的所有链接
  var links = list.getElementsByTagName("a");
  //为mouseover事件添加动画效果
  links[0].onmouseover = function(){
    moveElement("preview",-100,0,10);
  }
  links[1].onmouseover = function(){
    moveElement("preview",-200,0,10);
  }
  links[2].onmouseover = function(){
    moveElement("preview",-300,0,10);
  }
}
