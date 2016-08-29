# Tree

树组件。

```html
<div bx-name="components/tree" class="tree-wrapper">
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项       | 类型   | 默认值     | 说明
:----------- | :----  | :--------     - | :----------
data         | array  | -          | 必须。描述树结构的扁平数据。示例见上面的示例。
nodeTemplate | array  | -          | 可选。自定义节点模板，属性值是一个 AMD moduleId，模板引擎采用 Underscore 的 <a href="http://underscorejs.org/#template">_.template()</a>。
state        | string | `'expand'` | 可选。指定树结构的初始状态。可选值有 `'expand'`、`'collapse'`，分别表示展开、收起。


## 方法

### .expand( [ id ] )

* .expand( id )
* .expand()

展开节点。

### .collapse( [ id ] )

* .collapse( id )
* .collapse()

收起节点。

### .search( value )

* .search( value )

查找与参数 value 匹配的节点。

### .current( element )

* .current( element )
* .current( id )

查找节点关联的数据，或查找数据唯一标识 `id` 关联的节点。

参数 `element` 可以是 DOM 节点，类样式为 `tree-node-content`，也可以是数据唯一标识 `id`。

该方法返回一个对象，含有两个属性：`element` 和 `data`，分别表示父节点以及父节点对应的数据：

```json
{
    element: ...,
    data: {
        id: ...,
        name: ...,
        ...
    }
}
```

示例代码如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/tree')
instances[0].current('00')
```

### .parent( element )

* .parent( element )
* .parent( id )

查找父节点。

参数 `element` 可以是 DOM 节点，类样式为 `tree-node-content`，也可以是数据唯一标识 `id`。

该方法返回一个对象，含有两个属性：`element` 和 `data`，分别表示父节点以及父节点对应的数据：

```json
{
    element: ...,
    data: {
        id: ...,
        name: ...,
        ...
    }
}
```

示例代码如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/tree')
instances[0].parent('00')
```

### .children( element )

* .children( element )
* .children( id )

查找子节点。

参数同 `.parent( element )`。

该方法返回一个数组，其中的元素是对象，含有两个属性：`element` 和 `data`，分别表示子节点以及子节点对应的数据：

```json
[
    {
        element: ...,
        data: {
            id: ...,
            name: ...,
            ...
        }
    },
    ...
]
```

示例代码如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/tree')
instances[0].children('05')
```

### .siblings( element )

* .children( element )
* .children( id )

查找兄弟节点。

该方法返回一个数组，其中的元素是对象，含有两个属性：`element` 和 `data`，分别表示兄弟节点以及兄弟节点对应的数据：

```json
[
    {
        element: ...,
        data: {
            id: ...,
            name: ...,
            ...
        }
    },
    ...
]
```

示例代码如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/tree')
instances[0].siblings('0')
```

### .all()

* .all()

查找所有节点。

该方法返回一个数组，其中的元素是对象，含有两个属性：`element` 和 `data`，分别表示节点以及节点对应的数据：

```json
[
    {
        element: ...,
        data: {
            id: ...,
            name: ...,
            ...
        }
    },
    ...
]
```

示例代码如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/tree')
instances[0].all()
```

## 事件

事件类型        | 说明
:-------------- | :----------
click.tree      | 当点树击节点时被触发。监听函数接受 3 个参数：jQuery 事件对象 `event`、树节点关联的数据和树节点。
mouseenter.tree | 当鼠标移入树节点时被触发。监听函数接受 3 个参数：jQuery 事件对象 `event`、树节点关联的数据和树节点。
mouseleave.tree | 当鼠标移出树节点时被触发。监听函数接受 3 个参数：jQuery 事件对象 `event`、树节点关联的数据和树节点。
active.tree     | -
inactive.tree   | -

> 如果在组件节点上设置了 `prefix-click`、`prefix-mouseenter`、`prefix-mouseleave`，那么当鼠标点击、移入、移出非节点部分（即组件的空白部分）时，也会触发相应的事件，但是传给监听函数的参数只有 jQuery 事件对象，没有树节点关联的数据和树节点。此时，可以通过判断 `event.originalNamespace` 是否为 `tree` 来区分这两种事件。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/tree')
instances.on('click.tree', function(event, data, target) {
    if (event.namespace !== 'tree') return
    console.log(event, data, target)
})
instances.on('mouseenter.tree', function(event, data, target) {
    if (event.namespace !== 'tree') return
    console.log(event, data, target)
})
instances.on('mouseleave.tree', function(event, data, target) {
    if (event.namespace !== 'tree') return
    console.log(event, data, target)
})
```
