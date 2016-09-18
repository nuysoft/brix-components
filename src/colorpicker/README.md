# ColorPicker

调色板。

```html
<div bx-name="components/colorpicker" class="btn btn-default">ColorPicker</div>
<input bx-name="components/colorpicker" placeholder="ColorPicker">
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项    | 类型    | 默认值    | 说明
:-------  | :------ | :-------- | :----------
color     | string  | `#ffffff` | 调色板的初始值。
min       | boolean | `false`   | 是否精简模式。在精简模式下，只显示快捷颜色。
placement | string  | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
align     | string  | `'top'`   | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
offset    | object  | `{}`      | 指定浮层的偏移，可以含有两个属性：`left`、`top`。

## 方法

### .hex( [ value ] )

* .hex( value )
* .hex( )

设置或获取颜色值。颜色值格式为 `#RRGGBB`。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/colorpicker')
console.log(instances[0].hex())
instances[0].hex('#ff6600')
console.log(instances[0].hex())
```

### .rgb( [ value ] )

* .rgb( value )
* .rgb( )

设置或获取颜色值。颜色值格式为 `{ r: <red>, g: <green>, b: <blue> }`。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/colorpicker')
console.log(instances[0].rgb())
instances[0].rgb({
    r: 255,
    g: 102,
    b: 0
})
console.log(instances[0].hex())
console.log(instances[0].rgb())
console.log(instances[0].hsv())
```

### .hsv( [ value ] )

* .hsv( value )
* .hsv( )

设置或获取颜色值。颜色值格式为 `{ h: <hue>, s: <saturation>, v: <value> }`。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/colorpicker')
console.log(instances[0].hsv())
instances[0].hsv({
    h: 24,
    s: 1,
    v: 1
})
console.log(instances[0].hex())
console.log(instances[0].rgb())
console.log(instances[0].hsv())
```

## 事件

事件类型 | 说明
:--------- | :----------
change.colorpicker | 当值发生变化时被触发。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dropdown')
instances.on('change.dropdown', function(event, extra) {
    console.log(event, extra)
    // => extra
    /*
        {
            hex: #RRGGBB,
            hsv: { h: <hue>, s: <saturation>, v: <value> },
            rgb: { r: <red>, g: <green>, b: <blue> }
        }
     */
})
```

## 示例

<a href="./examples.html" target="_blank">examples.html</a>

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<!-- <iframe width="100%" height="500" src="//jsfiddle.net/nuysoft/m2813fv6/4/embedded/result,html,js,css,resources/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> -->
