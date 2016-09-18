# Table

增强表格。

```html
<table bx-name="components/table">
```

## 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项                    | 类型   | 默认值   | 说明
:------------------------ | :----- | :------- | :----------
column-name               | string | -        | **Th** 可选。指定列名，默认取单元格 `th` 的文本内容。
column-field              | string | -        | **Th** 可选。指定列名对应数据字段名，默认取单元格 `th` 的文本内容。
column-rwd-range          | array  | -        | **Table** 可选。指定列分页的范围，例如 `[3,-2]`。
column-rwd-cursor         | number | 1        | **Table** 可选。指定列分页的当前页数，例如 `1`、`2`。
column-rwd-limit          | array  | 5        | **Table** 可选。指定列分页的单页个数，例如 `5`。
column-priority-fields    | array  | -        | **Table** 可选。指定可显示的列。例如 `['gungungun', '滚动列 2', '滚动列 4', '滚动列 6']`
column-priority-trigger   | string | -        | **Table** 可选。指定触发列配置浮层的节点选择器表达式，例如 `'#clickme'`
column-priority-placement | string | 'bottom' | **Table** 可选。指定列配置浮层相对于触发节点的位置，可选值有 `'top'`、`'bottom'`、`'left'`、`'right'`。
column-priority-align     | string | 'right'  | **Table** 可选。指定列配置浮层相对于触发节点的对齐方式，可选值有 `''`、`'top'`、`'bottom'`、`'left'`、`'right'`。

**注意**

1. 设置 `column-rwd-range` 启用列分页功能。
1. 设置 `data-column-priority-trigger` 启用列配置功能。

## 方法

无。

## 事件

事件类型                     | 说明
:--------------------------- | :----------
toggle.table                 | 当勾选或取消勾选复选框时被触发。事件监听函数接受三个参数：`event`、`values`、`target`。参数 `values` 是一个数组，其中存放了被选中的复选框的值，没有任何复选框被选中，则为空数组 `[]`。参数 `target` 是被点击的复选框。
change.table_column_rwd      | 当列滚动时触发。事件监听函数接受两个参数：`event`、`state`。参数 `state` 是一个对象，其中存放了列分页的状态。
change.table_column_priority | 当列配置发生变化时触发。事件监听函数接受两个参数：`event`、`fields`。参数 `fields` 是一个数组，其中存放了排序后的列名。

```js
var Loader = require('brix/loader')
var instance = Loader.query('components/table')[0]
instance.on('toggle.table', function(event, values, target) {
    console.log(event.type, event.namespace, values, target)
})
instance.on('change.table_column_rwd', function(event, state) {
    console.log(event.type, event.namespace, state)
})
instance.on('change.table_column_priority', function(event, fields) {
    console.log(event.type, event.namespace, fields)
})
```

## 属性

属性名                | 类型   | 默认值 | 说明
:-------------------- | :----- | :----- | :----------
columnRWDHandler      | object | -      | 负责处理列分页。
columnPriorityHandler | object | -      | 列配置浮层的实例。

### 属性 columnRWDHandler

* .state

    包含了有关分页状态的所有信息。

* .flush( [ cursor ] )

    * .flush()
    * .flush( cursor )

    刷新或移动到指定页。

### 属性 columnPriorityHandler

* .columnPriorityHandler.show()

    显示列配置浮层。

* .columnPriorityHandler.hide()

    隐藏列配置浮层。

* .columnPriorityHandler.fields( [ fields ] )

    读取或设置可显示的列。

## 示例

<a href="./examples.html" target="_blank">examples.html</a>

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

# linkage( container, callback( event, values ) )

联动复选框工具函数。

* linkage( container, callback( event, values ) )

首先，需要在复选框 `<input type="checkbox">` 上附加两个属性 `data-linkage-name` 和 `data-linkage-parent-name`，分别表示当前复选框和父级复选框的唯一标识。例如：

```html
<label>
    <input type="checkbox" data-linkage-name="all"> All
</label>
<label>
    <input type="checkbox" data-linkage-name="item0" data-linkage-parent-name="all"> item 0
</label>
<label>
    <input type="checkbox" data-linkage-name="item1" data-linkage-parent-name="all"> item 1
</label>
```

然后，执行下面的代码，使容器元素 `container` 中的复选框的选中状态联动更新。如果子级复选框全部选中，则自动选中父级复选框；如果选中父级复选框，则自动选中全部子级复选框。

```js
require(['components/table/linkage'], function(linkage) {
    linkage('#container', function(event, values) {
        console.log(event, values)
    })
})
```

每当有复选框被点击时，会触发回调函数 `callback( event, values )`。其中，参数 `event` 是一个 [jQuery Event 对象](http://api.jquery.com/category/events/event-object/)，参数 `values` 是一个数组，包含了所有被选中复选框的值（即属性 `value`）。
