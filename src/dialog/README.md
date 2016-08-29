# Dialog

对话框。

```js
new Dialog( options )
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项    | 类型    | 默认值    | 说明
:-------- | :------ | :-------- | :----------
placement | string  | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
align     | string  | `''`      | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
left      | int     | -         | 指定浮层的距左坐标。
top       | int     | -         | 指定浮层的距上坐标。
width     | int     | `'auto'`  | 指定浮层的宽度。
height    | string  | `''`      | 指定浮层的高度。
offset    | object  | `{}`      | 指定浮层的偏移，可以含有两个属性：`left`、`top`。
content   | string  | `''`      | 指定浮层的内容。
closable  | boolean | `true`    | 指定浮层是否可关闭。
modal     | boolean | `false`   | 指定浮层是否模态对话框。
singleton | boolean | `true`    | 指定浮层是否单例模式。

## 方法

### .open()

* .open()

打开窗口。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dialog')
console.log(instances[0].open())
```

### .close()

* .close()

关闭窗口。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dialog')
console.log(instances[0].close())
```

## 事件

事件类型     | 说明
:----------- | :----------
open.dialog  | 当窗口打开时被触发。
close.dialog | 当窗口关闭时被触发。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dialog')
instances.on('open.dialog close.dialog', function(event) {
    console.log(event)
})
```
