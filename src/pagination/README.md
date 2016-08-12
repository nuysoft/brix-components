# Pagination

分页组件。

```html
<div bx-name="components/pagination" data-total="100" data-cursor="1" data-limit="10"></div>
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项 | 类型 | 默认值 | 说明
:--- | :--- | :------ | :----------
total | number | - | 必需。记录总条数。
cursor | number | `1` | 可选。当前页数，第几页，从 1 开始计数。
limit | number | `10` | 可选。当前分页大小。如果不在 `limits` 中，则会自动插入 `limits`。
limits | array | `[10, 20, 30, 40, 50]` | 可选。可供选择的分页大小。
simplify | boolean | `false` | 可选。是否开启简易模式。

## 方法

### .moveTo( cursor )

移动到指定页。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/pagination')
instances.moveTo(2)
```

### .total( [ total ] )

获取或设置总条数。

> 该方法不会触发事件 `change.pagination`。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/pagination')
instances[0].total( instances[0].total() + 1 )
console.log( instances[0].total() )
```

### .cursor( [ cursor ] )

获取或设置当前页数。

> 该方法不会触发事件 `change.pagination`。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/pagination')
instances[0].cursor( instances[0].cursor() + 1 )
console.log( instances[0].cursor() )
```

## 事件

事件类型 | 说明
:--------- | :----------
change.pagination | 当分页状态变化时被触发。

```js
var Loader = require('brix/loader')
Loader.query('components/pagination')
    .on('change.pagination', function(event, state) {
        console.log(event, state)
    })
```

上面代码中的参数 `state` 是一个对象，其中包含了有关分页状态的所有信息：

```js
{
    "total":    101,     // 总条数
    "cursor":   2,       // 当前页数，第几页，从 1 开始计算
    "limit":    40,      // 分页大小
    "pages":    3,       // 总页数
    "start":    40,      // 当前页的起始下标
    "end":      80,      // 当前页的结束下标
    "hasPrev":  true,    // 是否有前一页
    "hasNext":  true,    // 是否有下一页
    "hasFirst": true,    // 是否有第一页
    "hasLast":  true,    // 是否有最后一页
    "prev":     1,       // 前一页
    "next":     3,       // 后一页
    "first":    1,       // 第一页
    "last":     3,       // 最后一页
    "focus":    40       // 当前页的当前焦点下标
}
```

<script type="text/javascript">
    require(['brix/loader'], function(Loader){
        Loader.boot(function(){
            Loader.query('components/pagination')
                .on('change.pagination', function(event, state) {
                    console.log(event, state)
                })
        })
    })
</script>

## 示例

<div class="bs-example">
    <div class="content">
        <div bx-name="components/pagination" data-total="100" data-cursor="1" data-limit="9"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="2" data-limit="10"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="3" data-limit="11"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="4" data-limit="12" data-limits="[9, 10, 8, 7, 40, 30, 20]"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="5" data-limit="13" data-limits="[40, 30, 20]"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="6" data-limit="14" data-limits="[40, 30, 20]" data-simplify="true"></div>
    </div>
</div>

### 自定义文案

```html
<style type="text/css">
    ul.pagination > li:first-child > a > span.brixfont,
    ul.pagination > li:last-child > a > span.brixfont {
        display: none;
    }
    ul.pagination > li:first-child > a:after {
        content: "上一页";
    }
    ul.pagination > li:last-child > a:after {
        content: "下一页";
    }
</style>
```
