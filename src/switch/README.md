# Switch

滑动开关。

```html
<input type="checkbox" bx-name="components/switch">
```

<iframe width="100%" height="500" src="./demo.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 配置

自动从组件节点 `<input>` 上解析，在组件中通过 `this.options` 访问。

配置项 | 类型 | 默认值 | 说明
:--- | :--- | :------ | :----------
checked | boolean | false | 可选。是否选中。
disabled | boolean | false | 可选。是否禁用。
size | string | '' | 可选。设置滑动开关的尺寸，可选值有：`''`、`'small'`、`'large'`。

## 方法

### .toggle()

切换选中&不选状态。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/switch')
instances.toggle()
instances.toggle()
instances[0].toggle()
instances[0].toggle()
```

### .checked( [ checked ] )

* .checked( checked )
* .checked()

设置或获取选中状态。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/switch')
instances.checked()
instances[0].checked()
instances.checked(true)
instances.checked(false)
instances[0].checked(true)
instances[0].checked(false)
```

### .disabled( [ disabled ] ) 

* .disabled( checked )
* .disabled()

设置或获取禁用状态。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/switch')
instances.disabled()
instances[0].disabled()
instances.disabled(true)
instances.disabled(false)
instances[0].disabled(true)
instances[0].disabled(false)
```

### .val( [ value ] ) 

* .val( value )
* .val()

设置或获取组件节点的值。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/switch')
instances.val()
instances.val('foo')
instances[0].val()
instances[0].val('foo')
```

## 事件

事件类型 | 说明
:--------- | :----------
change.switch | 当值发生变化时被触发。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/switch')
instances.on('change.switch', function(event, extra) {
    console.log(event.component)
    console.log(extra)
    // => extra { name: ..., label: ..., value: ... }
})
```

## 样式

* `.switch` 初始
* `.switch-checked` 选中
* `.switch-disabled` 禁用

<script type="text/javascript">
    require(['brix/loader'], function(Loader) {
        Loader.boot(function() {
            var instances = Loader.query('components/switch')
            instances.on('change.switch', function(event, extra) {
                console.log(event.component)
                console.log(
                    event.type,
                    event.namespace,
                    extra
                )
            })
        })
    })
</script>

## 示例

<iframe width="100%" height="500" src="./demo.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>