# Dropdown

下拉框组件。

```html
<select bx-name="components/dropdown">
    <option value="1">Action</option>
    <option value="2">Another action</option>
    <option value="3">Something else here</option>
</select>
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项    | 类型              | 默认值  | 说明
:-------- | :---------------- | :------ | :----------
data      | array             | -       | 可选。下拉框中的数据。默认从子节点 `<optgroup>` 和 `<option>` 读取。
value     | string            | -       | 可选。下拉框的值。
searchbox | boolean           | `false` | 可选。是否开启下拉框中的输入框。可选值有 `false`、`true`、`'enter'`。
popover   | boolean or number | `false` | 可选。是否为下拉框的条目配置 `bx-name="components/popover"`。可选值有 `false`、`true`、`width`。
className | string            | -       | 指定类样式。
justify   | boolean           | -       | 是否两端对齐。

### 配置项 `searchbox`

值        | 说明
:-------- | :----------
`false`   | 不开启下拉框中的输入框。
`true`    | 开启下拉框中的输入框。当输入框的原生 `keyup` 事件被触发时，组件 Dropdown 触发 `search.dropdown` 事件。
`'enter'` | 开启下拉框中的输入框。当在输入框中按下 <kbd>enter</kbd> 键时，组件 Dropdown 触发 `search.dropdown` 事件。

### 配置项 `popover`

值      | 说明
:------ | :----------
`false` | 不为下拉框的条目配置 `bx-name="components/popover"`。
`true`  | 为下拉框的条目配置 `bx-name="components/popover"`。
`width` | 指定 Popover 浮层的宽度。


## 方法

### .val( [ value ] )

* .val( value )
* .val()

设置或读取下拉框的值。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dropdown')
console.log(instances[0].val())
instances[0].val(2)
console.log(instances[0].val())
```

### .data( [ data ] )

* .data( data )
* .data()

设置或读取下拉框中的数据。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dropdown')
console.log(instances[0].data())

instances[0].data([1,2,3])
instances[0].data([1,2,3]).val(3)

instances[0].data([
    { label: 'foo', value: 1 },
    { label: 'bar', value: 2 },
    { label: 'faz', value: 3 }
])
instances[0].data([
    { label: 'foo', value: 1 },
    { label: 'bar', value: 2 },
    { label: 'faz', value: 3 }
]).val(3)
```

## 事件

事件类型        | 说明
:-------------- | :----------
change.dropdown | 当值发生变化时被触发。
search.dropdown | 见配置项 `searchbox`。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dropdown')
instances.on('change.dropdown', function(event, extra) {
    console.log(event, extra)
    // => extra { name: ..., label: ..., value: ... }
})
instances.on('search.dropdown', function(event, seed) {
    console.log(event, seed)
    // => seed 输入值
})
```

## 示例

<a href="./examples.html" target="_blank">examples.html</a>

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>