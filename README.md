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

