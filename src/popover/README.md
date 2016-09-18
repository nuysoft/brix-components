# Popover

浮层。

```html
<div bx-name="components/popover" bx-options="{
    placement: 'top',
    title: 'Popover on top',
    content: 'Envy is the ulcer of the soul.'
}" class="btn btn-default">Popover on top</div>
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项    | 类型       | 默认值    | 说明
:-------- | :--------- | :-------- | :----------
placement | string     | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
align     | string     | `''`      | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
offset    | object     | `{}`      | 指定浮层的偏移，可以含有两个属性：`left`、`top`。
width     | int        | `'auto'`  | 指定浮层的宽度。
title     | string     | `''`      | 指定浮层的标题。
content   | string     | `''`      | 指定浮层的内容。
~~delay~~ | ~~number~~ | ~~`100`~~ | ~~指定延迟关闭浮层的时间，单位为毫秒。~~


## 方法

### .show()

* .show()

显示浮层。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/popover')
console.log(instances[0].show())
```

### .hide()

* .hide()

关闭浮层。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/popover')
console.log(instances[0].hide())
```

### .title( [ title ] )

* .title()
* .title( title )

获取或设置浮层的标题。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/popover')
instances[0].title(Math.random())
console.log(instances[0].title())
```

### .content( [ content ] )

* .content()
* .content( content )

获取或设置浮层的内容。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/popover')
instances[0].content(Math.random())
console.log(instances[0].content())
```

## 事件

无。

## 示例

<a href="./examples.html" target="_blank">examples.html</a>

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>