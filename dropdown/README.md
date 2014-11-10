# Dropdown

下拉框组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <h4>直接在 `<select>` 节点上附加 `bx-name="components/dropdown"`。</h4>
        <select bx-name="components/dropdown">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3">Something else here</option>
        </select>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <h4>支持 `<optgroup>`。</h4>
        <select bx-name="components/dropdown">
            <optgroup label="optgroup 1">
                <option value="1">Action</option>
            </optgroup>
            <optgroup label="optgroup 2">
                <option value="2">Another action</option>
            </optgroup>
            <optgroup label="optgroup 3">
                <option value="3" selected>Something else here</option>
            </optgroup>
        </select>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <h4>如果已经有了 JSON 数据，可以直接配置到 `data-data` 属性上，支持 `optgroup`。</h4>
        <select bx-name="components/dropdown" data-data="[
            {
                label: 'Action',
                value: 1
            }, {
                label: 'Another action',
                value: 2,
                selected: true
            }, {
                label: 'Something else here',
                value: 3
            }
        ]"></select>
        <select bx-name="components/dropdown" data-data="[
            {
                label: 'optgroup 1',
                children: [{
                    label: 'Action',
                    value: 1
                }]
            }, {
                label: 'optgroup 2',
                children: [{
                    label: 'Another action',
                    value: 2,
                    selected: true
                }]
            }, {
                label: 'optgroup 3',
                children: [{
                    label: 'Something else here',
                    value: 3
                }]
            }
        ]"></select>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <h4>支持分隔线 `<option class="divider"></option>`。</h4>
        <select bx-name="components/dropdown">
            <optgroup label="optgroup 1">
                <option value="1">Action</option>
            </optgroup>
            <optgroup label="optgroup 2">
                <option value="2">Another action</option>
            </optgroup>
            <option class="divider"></option>
            <optgroup label="optgroup 3">
                <option value="3" selected>Something else here</option>
            </optgroup>
        </select>
    </div>
</div>
<!-- 响应式 TODO http://silviomoreto.github.io/bootstrap-select/ -->

### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | array | - | 可选。下拉框中的数据。默认从子节点 `<optgroup>` 和 `<option>` 读取。

### 方法 <small>Methods</small>

#### .val( [ value ] )

* .val( value )
* .val()


设置或读取下拉框的值。

```js
var Loader = require('loader')
var instances = Loader.query('components/dropdown')
console.log(instances[0].val())
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change.dropdown | 当日期组件变化时被触发。

```js
var Loader = require('loader')
var instances = Loader.query('components/dropdown')
instances.on('change.dropdown', function(event, extra) {
    console.log(event, extra)
})
```
