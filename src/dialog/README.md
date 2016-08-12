# Dialog

对话框。

```js
new Dialog( options )
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项 | 类型 | 默认值 | 说明
:--- | :--- | :------ | :----------
placement | string | `'right'` | 指定浮层的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
align | string | `''` | 指定浮层的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。
left | int | - | 指定浮层的距左坐标。
top | int | - | 指定浮层的距上坐标。
width | int | `'auto'` | 指定浮层的宽度。
height | string | `''` | 指定浮层的高度。
offset | object | `{}` | 指定浮层的偏移，可以含有两个属性：`left`、`top`。
content | string | `''` | 指定浮层的内容。
closable | boolean | `true` | 指定浮层是否可关闭。
modal | boolean | `false` | 指定浮层是否模态对话框。
singleton | boolean | `true` | 指定浮层是否单例模式。

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

事件类型 | 说明
:--------- | :----------
open.dialog | 当窗口打开时被触发。
close.dialog | 当窗口关闭时被触发。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dialog')
instances.on('open.dialog close.dialog', function(event) {
    console.log(event)
})
```

<!-- 
### 示例 <small>Examples</small>

<div class="bs-example bs-example-modal">
    <div class="content">
        <div bx-name="components/dialog" bx-click="open" data-content="<div class='dialog-body'>hello<div>" data-placement="bottom" data-align="left" class="btn btn-default">Dialog</div>
        <div bx-name="components/dialog" bx-click="open" data-content="<div class='dialog-body'>hello<div>" data-placement="bottom" data-align="left" data-modal="true" class="btn btn-default">Modal Dialog</div>
        <div class="btn btn-default" bx-click="oepnDialog">new Dialog( options )</div>
    </div>
</div>
<div class="bs-example bs-example-modal">
    <div class="content">
        <input id="inputTrigger" bx-name="components/dialog" bx-focusin="open" bx-focusout="close" data-content="<div class='dialog-body'>hello</div>" data-placement="right" data-align="top" data-closable="false" data-offset="{ top: -10, left: 5 }" data-width="400" type="text" class="form-control w200">
    </div>
</div>
<div class="bs-example bs-example-modal">
    <div class="content">
        <input id="inputTrigger" bx-name="components/dialog" bx-focusin="open" bx-focusout="close" bx-options="{
            content: '\
                <div class=\'dialog-header\'>\
                    <h4 class=\'dialog-title\'>Title</h4>\
                </div>\
                <div class=\'dialog-body\'>\
                    <div>Content</div>\
                </div>\
                <div class=\'dialog-footer\'>\
                    <div>Close</div>\
                </div>\
            ',
            placement: 'right',
            align: 'top',
            closable: false,
            offset: {
                top: -10, 
                left: 5
            },
            width: 400
        }" type="text" class="form-control w200">
    </div>
</div>
<div class="bs-example bs-example-modal">
    <div class="content">
        <div bx-name="components/dialog" bx-click="open" data-placement="bottom" data-align="left" data-width="300" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">placement bottom + align left</div>
        <div bx-name="components/dialog" bx-click="open" data-placement="bottom" data-align="right" data-width="300" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">placement bottom + align right</div>
    </div>
</div>
<div class="bs-example bs-example-modal">
    <div class="content">
        <div bx-name="components/dialog" bx-click="open" data-placement="right" data-align="top" data-width="300" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">placement right + align top</div>
        <div bx-name="components/dialog" bx-click="open" data-placement="right" data-align="bottom" data-width="300" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">placement right + align bottom</div>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader', 'log'], function(Loader, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/dialog')
            instances.on('open.dialog close.dialog', function(event) {
                // var areYouSure = confirm('are you sure?')
                // if (!areYouSure) event.preventDefault()
                console.log(event.type, event.namespace)
            })
            // var $inputTrigger = Loader.query($('#inputTrigger'))[0]
            // $inputTrigger.on('open.dialog', function(event) {
            //     var $content = $inputTrigger.$relatedElement.find('.dialog-content')
            //     debugger
            //     Loader.load($content, 'components/spin')
            // })
        })
    })
</script>
 -->
<!-- ### 快速导航 <small>Quick Nav</small>

<div class="row">
    <div class="col-sm-4">
        <h4>Options</h4>
        <div><a href="">TODO</a></div>
        <div><a href="">TODO</a></div>
    </div>
    <div class="col-sm-4">
        <h4>Methods</h4>
        <div><a href="">TODO</a></div>
        <div><a href="">TODO</a></div>
    </div>
    <div class="col-sm-4">
        <h4>Events</h4>
        <div><a href="">TODO</a></div>
        <div><a href="">TODO</a></div>
    </div>
</div> -->

<!-- 
var Dialog = require('components/dialog')
var content = '\
    <div class="dialog-header">\
        <h4 class="dialog-title">abc</h4>\
    </div>\
'
var dialog = new Dialog({
    content: content,
    modal: true,
    left: 100,
    top: 100
})
dialog.on('open.dialog',function(){
    debugger
})
dialog.open()

// 多个浮层
var Dialog = require('components/dialog')
var _ = require('underscore')
var options = {
    modal: true,
    singleton: false,
    left: 0,
    top: 400
}

new Dialog(_.extend({}, options, {
    content: options.left += 100,
    left: options.left
}))
.on('open.dialog', function(event){
    console.log(event)
})
.on('close.dialog', function(event){
    console.log(event)
})
.open()
 -->

<!-- 

## TODO（临时记录，不属于文档）

**需求**

1. 可以通过 Loader 加载
    * DialogWrapper
2. 可以通过 new 新建 
    * var instance = new Dialog()
    * show(dialogOptions, viewName, viewOptions)
        * new Dialog( options )
        * load(view, options)
3. 单例模式
    * option singleton boolean
4. 支持加载 Magix View
    * load(view, options)
5. 支持 modal 模式
    * http://baike.baidu.com/view/3148035.htm
    * option modal boolean
6. 覆盖 JS Dialog Boxes：
    * alert       title message cancel ok
    * confirm     title message cancel ok
    * prompt      title input cancal  ok
7. 内置样式
    ```
    dialog
        dialog-dialog
            dialog-content
                dialog-header
                    dialog-title
                dialog-body
                dialog-footer
    ```
8. 复用性

    * Dialog 构造函数
        * .dialog-singleton
        * 自动加上 dialog-body
    * DialogTrigger
        * data-trigger
    * DialogView
        * open
        * hide
    * Overlay 浮层
        * Position 位置
 -->