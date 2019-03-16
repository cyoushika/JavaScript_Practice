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

## Charpter7:
知识盘点：本章主要介绍了如何动态添加元素节点以及Ajax
1. 传统的方法：document.write()函数，这个函数需要在<script>节点里执行。但是这违反了“行为应该与表现分离”的原则，即使把这句命令转移到js文件中，依然要面对"需要把想插入的语句放入script节点中才能执行"的问题。例如，当我们想实现插入'<p>This text is inserted</p>'的时候，编写了一个函数InsertText（text）的情况下，依然需要在script里执行例如InsertText("This text is inserted")。。另外，插入文本<p>很可能会被误认为是<p>标签，这是不被script允许的。

2. innerHTML:几乎所有浏览器都支持这个属性（通过<div></div>标签来使用）。以<div id="testdiv"><p>This is <em>my</em> content</p></div>来举例，id为"testdiv"的div标记下有一个p标记，而p标记下又有2个文本节点和1个em标记，em标记下又有1个文本节点的结构。而从innerHTML属性的角度来看，testdiv.innerHTML只有一个值为<p>This is <em>my</em> content</p>的字符串。想要访问其中具体的节点，就需要使用DOM提供的标准函数（getElementById等等），而innerHTML则更像是一个大锤子，涵盖一切。我们可以对innerHTML进行直接赋值，这种情况下，不论innerHTML之前又什么样的内容，他都会被覆盖掉。需要注意的是，innerHTML属性也是HTML的专有属性，不能用于任何其他标记语言文档。

3. DOM方法：使用getElementById和getElementsByTagName等方法把关于文档结构和内容的信息检索出来后再进行修改的话，可以做到更加细腻的调整。
- DOM提供了创建新元素的命令：document.createElement(nodeName)。
- 在创建新的元素以后，我们需要把它插入到HTML文档中，这时候就需要另一个函数：parentNode.appendChild(child)。这个函数可以将新创建的元素添加到parent节点里。例如：document.getElementById("testId").appendChild(child)。
- 在我们创建了p节点以后，需要向里面添加内容，DOM提供了创建文本节点的函数：document.createTextNode(text)。例如：document.createTextNode("HelloWorld")，创建完成以后，我们用appendChild函数将文本节点插入到p节点下面

4. 优化图片库：在之前，我们实现了HTML和JS代码的平稳退化，但依然留下了一段只为showPic脚本服务的代码，即placeholder。所以，我们可以把这部分代码利用动态创建的方式代替掉，实现更好的退化设计（参见function perparePlaceholder()). 我们固然可以使用appendChild的方法添加元素，但我们也有会遇到“想把元素插入到指定的位置，如XX之前，或XX之后”的诉求。这里可以使用insertBefore函数：parentElement.insertBefore(newElement,targetElement)。我们不需要知道targetElement的parentNode是什么，可以直接使用targetElement.parentNode来访问parent节点。但是很遗憾，DOM并没有提供insertAfter的方法，所以只能我们自己编写了

5. Ajax: 异步加载页面技术，可以让用户更流畅地浏览页面，用刷新加载一小部分页面内容代替重新加载整个页面的方法提高用户体验。其中用到的核心对象就是XMLHttpRequest对象。我们可以通过var request = new XMLHttpRequest(); 的方式创建这个对象，并进行信息交互操作。其中常用的函数就是open，而open下又有GET，PUSH，SEND等多个参数命令。本代码由于是在Chrome上执行的，所以并没有达到书中的效果，因为Chrome禁止对本地文件的访问。但依然要说的是，Ajax可以带来许多好处，但Ajax可以实现的应用，也一定可以通过非Ajax技术来实现，很多站点使用AJax技术并明确要求必须启用JavaScript才能正常访问网站，教科书作者并不赞同这个观点。如果从一开始就以Ajax为起点，那么日后确实很难把Ajax从成品中剥离，在提供一个不适用Ajax的版本，但是如果一开始我们就是基于老式的页面刷新机制构建的，那么可以在既有的基础上，用Ajax拦住发送到服务器的请求，并把请求转交给XMLHttpRequest对象来处理，这样Ajax就可以扮演一个常规站点之上的层了。Ajax依赖的是服务器的处理，而非用户本地的处理，即使没有启用JavaScript，用户的体验也只是”更慢“而已，对服务的内容本身没有影响
