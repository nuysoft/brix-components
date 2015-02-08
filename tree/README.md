# Tree

树组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <h4>把扁平数据渲染成树结构。</h4>
        <div bx-name="components/tree" class="tree-wrapper" data-state="collapse">
            [
                { id: '0', name: 'Loader' },
                { id: '1', name: 'Base' },
                { id: '2', name: 'Event' },

                { id: '00', pid: '0', name: 'Loader.boot( context, complete, notify )' },
                { id: '01', pid: '0', name: 'Loader.destroy( component, complete )' },
                { id: '02', pid: '0', name: 'Loader.query( moduleId, context )' },
                { id: '03', pid: '0', name: 'Loader.load( element, moduleId, options, complete )' },
                { id: '04', pid: '0', name: 'Loader.unload( element, complete )' },
                { id: '05', pid: '0', name: 'Loader.Options' },
                { id: '06', pid: '0', name: 'Loader.Constant' },

                { id: '10', pid: '1', name: '.init()' },
                { id: '11', pid: '1', name: '.render()' },
                { id: '12', pid: '1', name: '.destroy()' },
                { id: '12', pid: '1', name: '.on( types, selector, data, fn )' },
                { id: '12', pid: '1', name: '.one( types, selector, data, fn )' },
                { id: '12', pid: '1', name: '.off( types, selector, fn )' },
                { id: '12', pid: '1', name: '.trigger( type, data)' },
                { id: '12', pid: '1', name: '.triggerHandler( type, data )' },

                { id: '20', pid: '2', name: '.delegate( element, owner )' },
                { id: '21', pid: '2', name: '.undelegate( element )' },

                { id: '050', pid: '05', name: 'parse( element )' },
                { id: '051', pid: '05', name: 'data( element )' },

                { id: '060', pid: '06', name: 'VERSION' },
                { id: '061', pid: '06', name: 'ATTRS' },
                { id: '062', pid: '06', name: 'SELECTORS' },
                { id: '063', pid: '06', name: 'EVENTS' },
                { id: '064', pid: '06', name: 'OPTIONS' },
                { id: '065', pid: '06', name: 'EXPANDO' },
                { id: '066', pid: '06', name: 'UUID' }
            ]
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <h4>把扁平数据渲染成树结构。</h4>
        <div bx-name="components/tree" class="tree-wrapper">
            [{"id":2,"parentId":null,"name":"test2","order":1},{"id":3,"parentId":null,"name":"test3","order":2},{"id":1,"parentId":null,"name":"test1","order":3},{"id":12,"parentId":1,"name":"test12","order":1},{"id":11,"parentId":1,"name":"test11","order":2},{"id":32,"parentId":3,"name":"test32","order":3},{"id":21,"parentId":2,"name":"test21","order":4},{"id":31,"parentId":3,"name":"test31","order":5}] 
        </div>
    </div>
</div>

<script id="custom_tree_node_template" type="text/template">
    <div>
        id: <%= id %>,
        name: <span class="tree-node-content-name"><%= name %></span>,
        <span style="float: right;">count: 9999,</span>
        operation: <a href="#" style="float: right;">+</a>
    </div>
</script>
<script>
    define('custom/tree/node/template', function() {
        return document.getElementById('custom_tree_node_template').innerHTML
    })
</script>

<div class="bs-example">
    <div class="content">
        <h4>通过设置属性 `data-node-template` 自定义节点模板。</h4>
        <div bx-name="components/tree" data-node-template="custom/tree/node/template" class="tree-wrapper">
            [
                { id: '华北', name: '华北' },
                { id: '东北', name: '东北' },
                { id: '华东', name: '华东' },
                { id: '华南', name: '华南' },
                { id: '华中', name: '华中' },
                { id: '西南', name: '西南' },
                { id: '西北', name: '西北' },
                { id: '港澳台', name: '港澳台' },

                { id: 110000, parentId: '华北', name: '北京市' },
                { id: 120000, parentId: '华北', name: '天津市' },
                { id: 130000, parentId: '华北', name: '河北省' },
                { id: 140000, parentId: '华北', name: '山西省' },
                { id: 150000, parentId: '华北', name: '内蒙古自治区' }
            ]
        </div>
    </div>
</div>

模块 `custom/tree/node/template` 的内容如下：

```html
<script id="custom_tree_node_template" type="text/template">
    <div>
        id: <%= id %>,
        name: <span class="tree-node-content-name"><%= name %></span>,
        <span style="float: right;">count: 9999,</span>
        operation: <a href="#" style="float: right;">+</a>
    </div>
</script>
<script>
    define('custom/tree/node/template', function() {
        return document.getElementById('custom_tree_node_template').innerHTML
    })
</script>
```

<div class="bs-example">
    <div class="content">
        <h4>也可以在每条数据上附加一个 `content` 属性，指定节点渲染时的内容。</h4>
        <div bx-name="components/tree" class="tree-wrapper">
            <script type="text/javascript"></script>
            [
                { id: '华北', name: '华北', content: '<span class="tree-node-content-name"><i>hello</i></span><a href="#" style="float: right;">#</a>' },
                { id: '东北', name: '东北' },
                { id: '华东', name: '华东' },
                { id: '华南', name: '华南' },
                { id: '华中', name: '华中' },
                { id: '西南', name: '西南' },
                { id: '西北', name: '西北' },
                { id: '港澳台', name: '港澳台' },

                { id: 110000, parentId: '华北', name: '北京市', content: '<i>北京市</i>' },
                { id: 120000, parentId: '华北', name: '天津市' },
                { id: 130000, parentId: '华北', name: '河北省' },
                { id: 140000, parentId: '华北', name: '山西省' },
                { id: 150000, parentId: '华北', name: '内蒙古自治区' }
            ]
            <script type="text/javascript"></script>
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <h4>方法 `.search( value )` 示例。</h4>
        <input id="searchInput" class="form-control">
        <div id="searchTree" bx-name="components/tree" data-node-template="custom/tree/node/template" class="tree-wrapper">
            [
                { id: '华北', name: '华北' },
                { id: '东北', name: '东北' },
                { id: '华东', name: '华东' },
                { id: '华南', name: '华南' },
                { id: '华中', name: '华中' },
                { id: '西南', name: '西南' },
                { id: '西北', name: '西北' },
                { id: '港澳台', name: '港澳台' },

                { id: 110000, parentId: '华北', name: '北京市' },
                { id: 120000, parentId: '华北', name: '天津市' },
                { id: 130000, parentId: '华北', name: '河北省' },
                { id: 140000, parentId: '华北', name: '山西省' },
                { id: 150000, parentId: '华北', name: '内蒙古自治区' }
            ]
        </div>
    </div>
</div>

<script>
    var Loader = require('brix/loader')
    Loader.boot(function(){
        var tree = Loader.query($('#searchTree'))
        $('#searchInput').on('keyup', function(event){
            tree.search(event.target.value)
        })
    })
</script>

<div class="bs-example">
    <div class="content">
        <h4>TagInput + Tree + SearchInput 示例</h4>
        <div>
            <input id="demoTagInput" bx-name="components/taginput" data-suggest="false" class="form-control">
            <div class="input-group" style="margin-top: 2px;">
              <input id="demoSearchInput" type="text" placeholder="华北" class="form-control" >
              <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
            </div>
            <div id="demoTree" bx-name="components/tree" class="tree-wrapper">
                [
                    { id: '华北', name: '华北', content: '<i class="tree-node-content-name">华北</i>' },
                    { id: '东北', name: '东北' },
                    { id: '华东', name: '华东' },
                    { id: '华南', name: '华南' },
                    { id: '华中', name: '华中' },
                    { id: '西南', name: '西南' },
                    { id: '西北', name: '西北' },
                    { id: '港澳台', name: '港澳台' },

                    { id: 110000, parentId: '华北', name: '北京市', content: '<i>北京市</i>' },
                    { id: 120000, parentId: '华北', name: '天津市' },
                    { id: 130000, parentId: '华北', name: '河北省' },
                    { id: 140000, parentId: '华北', name: '山西省' },
                    { id: 150000, parentId: '华北', name: '内蒙古自治区' }
                ]
            </div>
        </div>
    </div>
</div>

<script>
    var Loader = require('brix/loader')
    $('#demoSearchInput').on('keyup', function(event){
        var tree = Loader.query($('#demoTree'))
        tree.search(event.target.value)
    })
    Loader.boot(function(){
        var tree = Loader.query($('#demoTree'))
        tree.on('click.tree',function(event, data, target){
            if (event.namespace !== 'tree') return
            console.log(event, data, target)

            var taginput = Loader.query($('#demoTagInput'))
            taginput.add(data.name)
        })
    })
</script>

<div class="bs-example">
    <div class="content">
        <h4>TagInput + Tree 的 `active`、`inactive` 事件示例</h4>
        <div>
            <input id="demoTagInput2" bx-name="components/taginput" data-suggest="false" class="form-control">
            <div id="demoTree2" bx-name="components/tree" class="tree-wrapper">
                [
                    { id: '华北', name: '华北', content: '<i class="tree-node-content-name">华北</i>' },
                    { id: '东北', name: '东北' },
                    { id: '华东', name: '华东' },
                    { id: '华南', name: '华南' },
                    { id: '华中', name: '华中' },
                    { id: '西南', name: '西南' },
                    { id: '西北', name: '西北' },
                    { id: '港澳台', name: '港澳台' },
                    { id: 110000, parentId: '华北', name: '北京市', content: '<i>北京市</i>' },
                    { id: 120000, parentId: '华北', name: '天津市' },
                    { id: 130000, parentId: '华北', name: '河北省' },
                    { id: 140000, parentId: '华北', name: '山西省' },
                    { id: 150000, parentId: '华北', name: '内蒙古自治区' }
                ]
            </div>
        </div>
    </div>
</div>

<script>
    var Loader = require('brix/loader')
    Loader.boot(function(){
        var taginput = Loader.query($('#demoTagInput2'))[0]
        var tree = Loader.query($('#demoTree2'))[0]
        taginput.on('active.taginput', function(event) {
            if (event.namespace !== 'taginput') return
            $(tree.element).show()
        })
        taginput.on('inactive.taginput', function(event) {
            if (event.namespace !== 'taginput') return
            $(tree.element).hide()
        })
        tree.on('inactive.tree', function(event) {
            if (event.namespace !== 'tree') return
            // debugger
        })
        tree.on('click.tree', function(event, data, target) {
            if (event.namespace !== 'tree') return
            taginput.add(data.name)
        })
    })
</script>

<script>
    // Loader.boot(function() {
    //     var instances = Loader.query('components/taginput')
    //     instances.on('active.taginput inactive.taginput', function(event) {
    //         console.log(event)
    //     })
    // })
</script>


### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | array | - | 必须。描述树结构的扁平数据。示例见上面的示例。
nodeTemplate | array | - | 可选。自定义节点模板，属性值是一个 AMD moduleId，模板引擎采用 Underscore 的 <a href="http://underscorejs.org/#template">_.template()</a>。
state | string | `'expand'` | 可选。指定树结构的初始状态。可选值有 `'expand'`、`'collapse'`，分别表示展开、收起。


### 方法 <small>Methods</small>

#### .expand( id )

* .expand( id )
* .expand()

#### .collapse( id )

* .collapse( id )
* .collapse()

#### .search( value )

* .search( value )


### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
click.tree | -
mouseenter.tree | -
mouseleave.tree | -

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
