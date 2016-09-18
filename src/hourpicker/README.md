# HourPicker

时间选择器组件。

```html
<div bx-name="components/hourpicker"></div>
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项   | 类型                      | 默认值  | 说明
:------- | :------------------------ | :------ | :----------
simplify | bolean                    | `false` | 可选。是否为精简模式。
value    | string or array or object | `''`    | 可选。指定选中的时间。

### 配置项 `value`

完整模式下配置项 `value` 的可选值示例：

```html
data-value="135"
data-value="1,3,5"
data-value="[1,3,5]"
data-value="{1:[0,2,4]}"
```

精简模式下配置项 `value` 的可选值示例：

```html
data-value="12345,60"
data-value="[12345,60]"
data-value="{12345:[0,2,4],60:[1,3,5]}"
```

## 方法

### .val( [ value ] )

设置或读取时间选择器的值。

* .val()

    读取时间选择器的值。

* .val( day, hours )
    
    设置单天选中的时间。

* .val( { day: [ hours ] } )

    同时设置多天选中的时间。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/hourpicker')
var fulled = instances[0]
var simplified = instances[1]

console.table(fulled.val())
// => 
{
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": []
}

console.table(simplified.val())
// => 
{
    "12345": [],
    "60": []
}

fulled.val(1, [1, 3, 5])
fulled.val({
    1: [9, 10, 11, 13, 14, 19, 20],
    0: [10, 11, 12, 21, 22, 23]
})

simplified.val(12345, [1, 3, 5])
simplified.val({
    12345: [9, 10, 11, 13, 14, 19, 20],
    60: [10, 11, 12, 21, 22, 23]
})
```

## 事件

事件类型          | 说明
:---------------- | :----------
change.hourpicker | 当值发生变化时被触发。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/hourpicker')
instances.on('change.hourpicker', function(event, extra) {
    if (event.namespace !== 'hourpicker') return
    console.log(event.type, event.namespace)
    console.table(extra)
})
```

## 示例

[examples.html](./examples.html)

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
