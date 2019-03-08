# JavaScript_Practice
只为学习JavaScript知识和练习编程（参考书：《JavaScript DOM编程艺术》（第二版）

## Charpter 3:
知识盘点：
- 一份文档就是一棵节点树
- 节点分为不同的类型：元素节点，属性节点和文本节点
- getElementById将返回一个对象，该对象对应着文档里的一个特定的元素节点
- getElementsByTagName和getElementsByClassName将返回一个对象数组，它们分别对应着文档里的一组特定的元素节点（需要特别注意的是这两个函数名与获取ID的函数不同，Element后面还有1个s)

## Charpter 4:
知识盘点：
- 本章学习了如何展示图片，以及利用事件处理函数(onclick)来实现JS代码和Html网页的结合
- 本章还学习了childNodes，用于获取一个元素节点下的所有子节点，然而，需要注意的是，这个节点并不仅仅指元素节点，属性节点和文本节点，还包含许多奇奇怪怪的（甚至一个空格都能算作一个节点）节点。所以，必要时需要通过nodeType来检查和筛选。nodeType返回的并非字符串，而是一个数字，1代表元素节点，2代表属性节点，3代表文本节点，其他数字虽然也指向别的节点，但并无实际意义。
- 在我们找到对应的节点以后希望读取他的值时，可以使用nodeValue函数。但，直接使用这个函数的时候，可能会面临返回的值是null的状况，这是因为这个节点本身的value是null，而我们想要访问的其实是他的子节点。这个时候需要访问node.childNodes[第几个子节点].nodeValue来实现。而第一个子节点及最后一个子节点都有更快捷的访问方式，即firstChild.nodeValue和lastChild.nodeValue.nodeValue这个函数不仅可以访问节点的值，还可以对该值进行赋值，用=就可以进行值的转换

## Charpter 5:
知识盘点：
- 建立一个系统，应该实现以下几个方面：
    * 平稳退化（即不支持JavaScript也可以正常访问网站）：具体做法就是保证<a>里面的href即包含原本的URL链接，后面的事件处理器（onclick）的URL链接用this.href代替

    * 分离JavaScript : 即使做到了平稳退化，系统还不够棒，需要进一步升级。即把事件处理器也放入js文件里。具体做法就是定义一个属性节点（例如class），然后在js文件里使用getElementsByTagName来获得每个tag，保存到一个变量里（例如links）。遍历links的每个元素，检查他们的class，在满足条件的时候（例如class=="popup")，links[i]。onclick= (具体的行为)。这样，就可以实现在html文件里不用写事件处理器也能实现js结合了。但是，这样会出现一个问题，即我们用document.getElementsByTagName的时候，js会在加载完成以后立马执行这句命令，而DOM可能还没有加载完毕..而解决办法就是，在js文件的最开始加一句window.onload=(函数)，window.onload表示该页面加载完毕以后执行的语句，这样可以保证函数是在页面加载完毕以后才执行相关命令，避免了我们之前说的问题。

    * 向后兼容：有时版本更替，或者用户的设置，会导致JavaScript无法使用。为了避免这种情况，最好的办法就是在使用js命令之前，确认一下能不能使用。在函数里加入一句if语句，比如"如果不能使用getElementById的话，就return false",写成代码就是if(!document.getElementById) return false; 这样做可以保证javascript不能正常运行的时候出现的问题

    * 性能考虑：js文件应该尽可能合并成一个，减少加载数量。代码应该尽可能压缩。下面是推荐的代码压缩工具:
        - Douglas Crockford: <http://www.crockford.com/javascript/jsmin.html>
        - Yahoo YUI Compressor: <http://www.developer.yahoo.com/yui/compressor>
        - Google Closure Compiler: <http://closure-compiler.appspot.com/home>

## Charpter 6:
知识盘点：本章节主要是为了完善第四章中制作的图片库网站。
1. 是否实现了平稳退化：因为我们保留了每个<a>里面href的原始链接，没有使用伪协议，所以即使用户禁用了JS功能，他们依然可以正常访问我们的网站，只不过每次打开图片后想返回就得点返回键了。
2. js和html文件是否是分离的：第四章的时候还没有，因为我们吧onclick的事件处理函数放在了html文件的每个<a>节点里。为了分离js和html，我们对此进行了优化：
    * 为ul节点设置一个独一无二的id，名为“imagegallery”，为js文件提供“挂钩”
    * 为了保证兼容性，我们需要检查当前浏览器是否支持DOM Core命令。即getElementById和getElementsByTagName。同时，我们需要检查当前网站是否有一个元素的id为“imagegallery"。之后，我们遍历imagegallery元素里的所有链接，为每个链接的onclick事件提供一个匿名function（即不命名的函数，只有function（））来实现功能（传递这个链接当做参数给showPic函数，取消链接被点击时的默认行为，不让浏览器打开这个链接）
    * 使用window.onload=（函数）可以让我们实现网页加载完毕以后再执行js脚本的功能，但这样的做法不支持多个函数加载的情况。如果直接写
    'window.onload=函数1;
     window.onload=函数2;'
    的话，函数2会把函数1顶掉。而在需要绑定的函数不是很多的时候，我们可以用
    'window.onload = function(){
     firstFunction();
     secondFunction();'
    的方式来实现多个函数的绑定。但是，还有一种方法，那就是写一个函数，来弹性绑定各个函数，我们可以命名它为addLoadEvent。代码如下：
'function addLoadEvent(func){
var oldonload = window.onload;
  if(typeof window.onload != \'fuction\')'{
    window.onload=func;
  }
  else{
	window.onload=function(){
	oldonload();
	func();
    }
  }
}'

    * 为了实现更好的兼容性，应该多去检查元素，并提供对策（增加了许多if判断）
    * 在检查nodeName的时候，需要注意的是，尽管节点的名字可能是小写字母，但是这个属性返回的总是*大写字母*的值。
    * 键盘访问：有一个事件处理函数叫onkeypress，这个可以实现”当用户按下键盘按钮的时候，。。。“的功能，听上去很好，但实际上不管用户按键盘上的什么按钮，都会触发这个事件，从而导致很多问题。而onclick虽然名字是click，但实际上用Tab键转移到相应链接然后按Enter键的动作，也可以算作是click，所以用onclick就可以处理我们的需求，完全不用onkeypress

3. 结合JavaScript和CSS：我们在html里为js留下的挂钩，也同样可以在css里使用，我们可以单独为#imagegallery设置style。还可以为#imagegallery下的li，a，img单独设置style，十分的方便

4. 关于DOM Core和HTML-DOM：getAttribute("href")，getElementsById，setAttribute等等都是DOM Core的组成部分，并不专属于JavaScript，支持DOM的任何一种语言都可以使用它们。它们不仅可以用于处理网页，还可以处理任何一种标记语言（比如XML）编写出来的文档。而使用JavaScript语言和DOM为HTML文件编写脚本的时候，有许多属性可供使用，比如onclick。这些属性属于HTML-DOM，可以大幅简化代码。比如document.getElementsByTagName("form")可以简化成document.forms。但是需要注意的是，HTML-DOM记号只能用于处理Web文档！
