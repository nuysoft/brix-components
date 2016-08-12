# TagInput

标签输入组件。

```html
<input bx-name="components/taginput">
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项 | 类型 | 默认值 | 说明
:--- | :--- | :------ | :----------
data | array | `[]` | 初始值。例如 `['foo', 'bar', 'baz']`。
placeholder | string | `''` | 描述预期值的简短提示。
suggest | boolean | `true` | 指示是否关闭 Suggest 组件。默认启用。

## 方法

### .add( value )

* .add( value )

增加一个值。

**使用示例**如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
instances.add('foo')
instances.add('bar')
```

### .delete( value )

* .delete( value )
    
    删除一个值。

* .delete( )

    删除所有值。

**使用示例**如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
instances.delete('foo')
instances.delete()
```

### .val( [ data ] )

* .val( data )
* .val()

读取或设置值。

**使用示例**如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
console.log(instances[0].val())
```

## 属性

属性名 | 类型 | 默认值 | 说明
:--- | :--- | :------ | :----------
suggest | Suggest | Suggest 组件实例 | `components/suggest`

提示补全的内容通过执行 `.suggest.data( array )` 显示。

**使用示例**如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
_.each(instances, function(taginput, index) {
    // 监听 Suggest 组件触发的 change.suggest.input 事件
    taginput.on('change.suggest.input', function(event, value) {
        if (!event.namespace) return
        // 构造提示补全的内容，调用 taginput.suggest.data()
        taginput.suggest.data(
            [ Math.random(), Math.random(), Math.random() ]
        )
    })
})
```

> 可以利用 Underscore 提供的 [`_.difference(array, *others)`](http://underscorejs.org/#difference) 从构造提示补全的内容中过滤已输入的词条。


## 事件

事件类型 | 说明
:--------- | :----------
change.taginput | 当值变化时触发。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
instances.on('change.taginput', function(event, data, action, value) {
    console.log(event, data, action, value)
})
```
<script type="text/javascript">
    // require(['brix/loader', 'underscore'], function(Loader, _){
    //     Loader.boot(function(){
    //         var instances = Loader.query('components/taginput')
    //         _.each(instances, function(item, index){
    //             item.on('active.taginput inactive.taginput', function(event) {
    //                 console.log(item.clientId, event.type, event.namespace)
    //             })    
    //         })
    //     })
    // })
</script>

## 示例

<div class="bs-example">
    <div class="content">
        <input bx-name="components/taginput" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>通过 HTML 属性 `data-data` 指定初始值。</p>
        <input bx-name="components/taginput" data-data="['foo', 'bar', 'baz']" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>通过 HTML 属性 `data-placeholder` 指定描述预期值的简短提示。</p>
        <input bx-name="components/taginput" data-placeholder="输入几个字符试试" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>可以限制词条的个数。</p>
        <input bx-name="components/taginput" data-limit="3" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>不允许增加重复值。</p>
        <input bx-name="components/taginput" data-limit="3" data-same="false" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>设置属性 `data-suggest="false"` 可以关闭 Suggest 组件。</p>
        <input bx-name="components/taginput" data-suggest="false" class="form-control">
    </div>
</div>

<script>
    require(['brix/loader', 'underscore', 'mock'], function(Loader, _, Mock) {
        Loader.boot(function() {
            var data = Mock.mock({
                'list|5-10': ['@NAME', 'N@NATURAL']
            }).list
            var taginputs = Loader.query('components/taginput')
            _.each(taginputs, function(taginput, index) {
                taginput.on('change.suggest.input', function(event, value) {
                    if (!event.namespace) return
                    // if (!value) taginput.suggest.data([])
                    taginput.suggest.data(
                        _.difference(
                            _.filter(data, function(item, index) {
                                return ('' + item).indexOf(value) !== -1
                            })
                            , taginput.val()
                        )
                    )
                })
            })
        })
    })
</script>