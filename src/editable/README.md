# Editable

可编辑的页面元素。

```html
<!-- 简单模式 -->
<p bx-name="components/editable">This is a editable paragraph.</p>

<!-- 自定义模式 -->
<div bx-name="components/editable">
    <div class="editable-content">content</div>
    <div class="editable-toggle">toggle icon</div>
    <input class="editable-input">
</div>
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项  | 类型   | 默认值 | 说明
:------ | :----- | :----- | :----------
type    | string | 'text' | 必选。描述待编辑内容的类型。可选值有两个：`text`、`html`。
content | string | ''     | 可选。指定待编辑内容。默认从节点属性 `innerHTML` 或 `innerText` 读取。

## 方法

### .show()

* .show()

显示编辑框。

```js
var Loader = require('brix/loader')
var editables = Loader.query('components/editable')
editables.show()
```

### .hide()

* .hide()

隐藏编辑框。

```js
var Loader = require('brix/loader')
var editables = Loader.query('components/editable')
editables.hide()
```

## 事件

事件类型        | 说明
:-------------- | :----------
change.editable | 当内容发生变化时被触发。

```js
var Loader = require('brix/loader')
var editables = Loader.query('components/editable')
editables.on('change.editable', function(event, extra) {
    // if (event.namespace !== 'editable') return
    console.log(event.type, event.namespace, extra)
})
```

> 如果在事件 `change.editable` 的监听函数中调用了 `event.preventDefault()`，则不会更新组件的内容。该功能可以用于对新内容的验证。

## 示例

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
