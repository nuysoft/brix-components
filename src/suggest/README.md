# Suggest

提示补全组件。

```html
<input bx-name="components/suggest" class="form-control">
```

## 配置

无。

## 方法

### .data( [ data ] )

读取或设置提示浮层中的数据。

### .val( [ value ] )

读取或设置当前组件输入框的值。

## 事件

事件类型               | 说明
:--------------------- | :----------
change.suggest.suggest | 当用户输入关键字时触发。监听函数接受 2 个参数：jQuery 事件对象 `event` 和输入的关键字 `extra`。
change.suggest.done    | 当用户选中提示浮层中某个条目时触发。监听函数接受 2 个参数：jQuery 事件对象 `event` 和选中条目的文本内容 `extra`。

```js
var Loader = require('brix/loader')
var _ = require('underscore')
var Mock = require('mock')
var data = Mock.mock({
    'list|5-10': ['@NAME', '@NATURAL(1,1000000)', '@CWORD']
}).list
var instances = Loader.query('components/suggest')
instances.on('change.suggest.input', function(event, extra) {
    instances.data(
        _.filter(data, function(item, index){
            return ('' + item).toLowerCase().indexOf(extra.toLowerCase()) !== -1
        })
    )
})
instances.on('change.suggest.done', function(event, extra) {
    console.log(event.type, event.namespace, extra)    
})
```

## 示例

[examples.html](./examples.html)

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
