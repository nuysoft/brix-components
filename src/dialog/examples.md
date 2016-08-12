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