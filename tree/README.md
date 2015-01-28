# Tree

树组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <h4>把扁平数据渲染成树结构。</h4>
        <div bx-name="components/tree" bx-options="{}">
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
<div class="bs-example">
    <div class="content">
        <h4>通过设置属性 `data-template` 可以自定义节点模板，它的值是一个 AMD moduleId，模板引擎采用的是 <a href="http://underscorejs.org/#template">_.template()</a>。</h4>
        <div bx-name="components/tree" bx-options="{}" data-template="components/tree/tree.node.json.tpl">
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

模块 `components/tree/tree.node.json.tpl` 的内容如下：

```js
/* global define */
define(function() {
    return (function(){/*
<div>
    id: <%= id %>,
    name: <span class="tree-node-content-name"><%= name %></span>,
    operation: <a href="#" style="float: right;">+</a>
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})
```

<div class="bs-example">
    <div class="content">
        <h4>你也可以在每条数据上附加一个 `content` 属性，指定节点内容。</h4>
        <div bx-name="components/tree" bx-options="{}">
            [
                { id: '华北', name: '华北', content: '<i>hello</i>' },
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