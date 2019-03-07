#JavaScript_Practice
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
        - Douglas Crockford: http://www.crockford.com/javascript/jsmin.html
        - Yahoo YUI Compressor: http://www.developer.yahoo.com/yui/compressor
        - Google Closure Compiler: http://closure-compiler.appspot.com/home
