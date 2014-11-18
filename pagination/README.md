# Pagination

分页组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/pagination" data-total="100" data-cursor="1" data-limit="9"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="2" data-limit="10"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="3" data-limit="11"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="4" data-limit="12" data-limits="[40, 30, 20]"></div>
    </div>
</div>

### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
total | number | - | 必需。记录总条数。
cursor | number | `1` | 可选。当前页数，第几页，从 1 开始计数。
limit | number | `10` | 可选。当前分页大小。如果不在 `limits` 中，则会自动插入 `limits`。
limits | array | `[10, 20, 30, 40, 50]` | 可选。可供选择的分页大小。


### 方法 <small>Methods</small>

#### .moveTo( cursor )

移动到指定页。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/pagination')
instances.moveTo(2)
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change.pagination | 当分页状态变化时被触发。

```js
var Loader = require('brix/loader')
Loader.query('components/pagination')
    .on('change.pagination', function(event, status) {
        console.log(event, status)
    })
```

上面代码中的参数 `status` 是一个对象，其中包含了有关分页状态的所有信息：

```json
{
    "total": 101,
    "cursor": 2,
    "limit": 40,
    "pages": 3,
    "start": 40,
    "end": 80,
    "hasPrev": true,
    "hasNext": true,
    "hasFirst": true,
    "hasLast": true,
    "prev": 1,
    "next": 3,
    "first": 1,
    "last": 3,
    "focus": 40
}
```