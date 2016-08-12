# ColorPicker

调色板。

```html
<div bx-name="components/colorpicker" class="btn btn-default">ColorPicker</div>
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项 | 类型 | 默认值 | 说明
:--- | :--- | :------ | :----------
color | string | `#ffffff` | 调色板的初始值。
min | boolean | `false` | 是否精简模式。在精简模式下，只显示快捷颜色。
placement | string | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
align | string | `'top'` | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
offset | object | `{}` | 指定浮层的偏移，可以含有两个属性：`left`、`top`。

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

<iframe width="100%" height="500" src="./demo.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<!-- <iframe width="100%" height="500" src="//jsfiddle.net/nuysoft/m2813fv6/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> -->

```html
<div bx-name="components/colorpicker" class="btn btn-default">ColorPicker</div>
<input bx-name="components/colorpicker" placeholder="ColorPicker">
<div bx-name="components/colorpicker" data-color="#ff6600" class="btn btn-default">设置初始值</div>
<div bx-name="components/colorpicker" data-min="true" class="btn btn-default">精简模式</div>
```

```html
<div bx-name="components/colorpicker" class="btn btn-default">默认：位于下方 + 左侧对齐</div>
<div bx-name="components/colorpicker" data-align="right" class="btn btn-default">位于下方 + 右对齐</div>
<div bx-name="components/colorpicker" data-align="" class="btn btn-default">位于下方 + 水平居中对齐</div>
```

```html
<div bx-name="components/colorpicker" 
    data-placement="right" 
    data-align="top" 
    class="btn btn-default">位于右侧 + 顶部对齐</div>
<div bx-name="components/colorpicker" 
    data-placement="right" 
    data-align="bottom" 
    class="btn btn-default">位于右侧 + 底部对齐</div>
<div bx-name="components/colorpicker" 
    data-placement="right" 
    data-align="" 
    class="btn btn-default">位于右侧 + 垂直居中对齐</div>
```

```html
<div bx-name="components/colorpicker" data-placement="top" data-align="left" class="btn btn-default">位于上方 + 左侧对齐</div>
<div bx-name="components/colorpicker" data-placement="top" data-align="right" class="btn btn-default">位于上方 + 右侧对齐</div>
<div bx-name="components/colorpicker" data-placement="top" data-align="" class="btn btn-default">位于上方 + 水平居中对齐</div>
```

```html
<div bx-name="components/colorpicker" 
    data-placement="left" 
    data-align="top" 
    class="btn btn-default">位于左侧 + 顶部对齐</div>
<div bx-name="components/colorpicker" 
    data-placement="left" 
    data-align="bottom" 
    class="btn btn-default">位于左侧 + 底部对齐</div>
<div bx-name="components/colorpicker" 
    data-placement="left" 
    data-align="" 
    class="btn btn-default">位于左侧 + 垂直居中对齐</div>
```

```js
require(['brix/loader'], function(Loader) {
    Loader.boot(function() {
        var instances = Loader.query('components/colorpicker')
        instances.on('change.colorpicker', function(event, extra) {
            // event.preventDefault()
            console.log(
                event.type,
                event.namespace,
                extra
            )
        })
    })
})
```

<!-- <script async src="//jsfiddle.net/nuysoft/m2813fv6/embed/"></script> -->