# Editable

可编辑的页面元素。{ .lead }

<!-- Editable enables user click element to edit it. -->

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <h3 bx-name="components/editable">This is a editable title.</h3>
        <p bx-name="components/editable">This is a editable paragraph. This is a editable paragraph. This is a editable paragraph. This is a editable paragraph. This is a editable paragraph. This is a editable paragraph.</p>
        <pre bx-name="components/editable">This is a editable predefined.</pre>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <p bx-name="components/editable" data-type="html"><kbd>This is a editable keyboard input element.</kbd> cool!</p>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <span bx-name="components/editable" data-content="A editable span with content from data-*."></span>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        Hello <span bx-name="components/editable">Editable</span>!
    </div>
</div>

<script>
    var Loader = require('brix/loader')
    Loader.boot(function() {
        var editables = Loader.query('components/editable')
        editables.on('change.editable', function(event, extra) {
            if (event.namespace !== 'editable') return
            if(extra.length < 3) {
                console.warn('太短了，最少 3 个字符！')
                event.preventDefault()
            }
            console.log(event.type, event.namespace, extra)
        })
    })
</script>

### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
type | string | 'text' | 必选。描述待编辑内容的类型。可选值有两个：`text`、`html`。
content | string | '' | 可选。指定待编辑内容。默认从节点属性 `innerHTML` 或 `innerText` 读取。

### 方法 <small>Methods</small>

#### .show()

* .show()

显示编辑框。

```js
var Loader = require('brix/loader')
var editables = Loader.query('components/editable')
editables.show()
```

#### .hide()

* .hide()

隐藏编辑框。

```js
var Loader = require('brix/loader')
var editables = Loader.query('components/editable')
editables.hide()
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change.editable | 当内容发生变化时被触发。

```js
var Loader = require('brix/loader')
var editables = Loader.query('components/editable')
editables.on('change.editable', function(event, extra) {
    if (event.namespace !== 'editable') return
    console.log(event.type, event.namespace, extra)
})
```

> 如果在事件 `change.editable` 的监听函数中调用了 `event.preventDefault()`，则不会更新组件的内容。该功能可以用于对新内容的验证。

