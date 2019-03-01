## css盒模型
> css盒模型分为标准盒模型与IE盒模型

```JavaScript
// 获取盒模型对应的宽高
// 只能取到内联样式的宽与高
dom.style.width/height
// 不关内外联属性，但只支持IE
dom.currentStyle.width/height
// ff、chrome 即时的高度宽度
window.getComputedStyle(dom).width/height
// 计算元素的绝对位置，left，top，width,height
dom.getBoundingClientReact().width/height
// 
dom.offsetWidth/offsetHeight
```
> BFC原理：1.垂直方向会发生重叠 2.bfc的区域不会与浮动元素发生重叠 3.计算bfc高度是浮动元素也会参与计算 4.外面的元素不会影响里面的元素，反之亦然 

> 创建BFC 1.position不为static或relative 2.display 与table相关的 3.overflow auto hidden scroll 4.float不为none

> BFC的使用场景：

## dom事件类
1.基本概念：DOM事件的级别
2.DOM事件模型
3.DOM事件流
4.描述DOM事件捕获的具体流程
5.Event对象的常见应用
6.自定义事件

> 描述DOM事件捕获的具体流程: window -> document -> html -> body -> targerDom

![](../../images/buju.jpeg '描述')