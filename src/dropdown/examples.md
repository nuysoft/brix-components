## 示例

<div class="bs-example">
    <div class="content">
        <h4>直接在 `<select>` 节点上附加 `bx-name="components/dropdown"`。</h4>
        <select bx-name="components/dropdown">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3">Something else here</option>
        </select>
        <select bx-name="components/dropdown" data-value="2">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3">Something else here</option>
        </select>
        <select bx-name="components/dropdown" data-value="true">
            <option value="">Anything</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
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
        <h4>可以在事件 `change.dropdown` 中对选中的值进行修正。</h4>
        <select id="conflict" name="conflict" bx-name="components/dropdown">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3">Something else here</option>
        </select>
    </div>
</div>

```js
var Loader = require('brix/loader')
var conflict = Loader.query($('#conflict'))[0]
conflict.on('change.dropdown', function(event, extra){
    console.log(extra)
    if(extra.value == '3') {
        event.component.val('1')
    }
})
```

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

<div class="bs-example">
    <div class="content">
        <h4>支持搜索框 `data-searchbox="true|enter"`。</h4>
        <p>详细说明见下方的配置项 `searchbox`</p>
        <select bx-name="components/dropdown" data-searchbox="true" bx-search="filter">
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
        <select bx-name="components/dropdown" data-searchbox="enter" bx-search="filter">
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

<div class="bs-example">
    <div class="content">
        <h4>支持 Popover `data-popover="true|width"`。</h4>
        <select bx-name="components/dropdown" data-popover="true">
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
        <select bx-name="components/dropdown" data-popover="200">
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

<div class="bs-example">
    <div class="content">
        <h4>支持设置宽度 `data-width="width"`。</h4>
        <select bx-name="components/dropdown" data-width="100">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3" selected>Something else here</option>
        </select>
        <select bx-name="components/dropdown" data-width="100px">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3" selected>Something else here</option>
        </select>
        <select bx-name="components/dropdown" data-width="100%">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3" selected>Something else here</option>
        </select>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <h4>支持设置两端对齐 `data-justify="true"`。</h4>
        <select bx-name="components/dropdown" data-width="100" data-justify="true">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3" selected>Something else here</option>
        </select>
        <select bx-name="components/dropdown" data-width="100px" data-justify="true">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3" selected>Something else here</option>
        </select>
        <select bx-name="components/dropdown" data-width="100%" data-justify="true">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3" selected>Something else here</option>
        </select>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader'], function(Loader) {
        Loader.boot(function() {
            var instances = Loader.query('components/dropdown')
            instances.on('change.dropdown', function(event, extra) {
                console.log(
                    event.type,
                    event.namespace,
                    extra
                )
            })
        })
    })
    require(['brix/loader'], function(Loader) {
        Loader.boot(function() {
            var conflict = Loader.query($('#conflict'))[0]
            conflict.on('change.dropdown', function(event, extra){
                console.log(extra)
                if(extra.value == '3') {
                    event.component.val('1')
                }
            })
        })
    })
</script>

<!-- 响应式 TODO http://silviomoreto.github.io/bootstrap-select/ -->