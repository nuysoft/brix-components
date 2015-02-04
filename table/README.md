# Table

增强表格。{ .lead }

### 示例 <small>Examples</small>

<!-- <table bx-name="components/table" class="table table-hover">
    <thead>
        <tr>
            <th><input type="checkbox" data-linkage-name="all"> all</th>
            <th>table</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input type="checkbox" data-linkage-name="1" data-linkage-parent-name="all"> 1</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                <table bx-name="components/table" class="table table-hover">
                    <tbody>
                        <tr>
                            <td><input type="checkbox" value="1.1" data-linkage-name="1.1" data-linkage-parent-name="1"> 1.1</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" value="1.2" data-linkage-name="1.2" data-linkage-parent-name="1"> 1.2</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table> -->

<div class="bs-example bs-example-modal">
    <div class="content">
        <table bx-name="components/table" class="table table-hover">
            <thead>
                <tr>
                    <th><input type="checkbox" data-linkage-name="all"></th>
                    <th>Id</th>
                    <th>Feature <span bx-name="components/popover" data-content="功能列表。" data-placement="bottom" class="glyphicon glyphicon-question-sign gray"></span></th>
                    <th>More <span bx-name="components/popover" data-content="鼠标移入之后显示更多内容。" data-placement="bottom" class="glyphicon glyphicon-question-sign gray"></span></th>
                    <th width="150px">Operations <span bx-name="components/popover" data-content="注意到最后一列了吗？鼠标移入之后才会显示。" data-placement="bottom" class="glyphicon glyphicon-question-sign gray"></span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" value="Aatrox" data-linkage-parent-name="all"></td>
                    <td>Aatrox</td>
                    <td>全选&amp;反选</td>
                    <td>
                        <div class="more">
                            <div class="title">鼠标移入这里</div>
                            <div class="content">
                                <h3>卡马克</h3>
                                <p>29 岁的卡马克是一个计算机程序员，一个清心寡欲并且乐善好施的人，一个在业余时间里建造高能火箭的人，比尔·盖茨（Bill Gates）心目中为数不多的天才之一。程序代码的优雅清晰是他的追求，也是他的游戏。</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="operation">
                            <a href="javascript: void(0);">详情</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" value="Ahri" data-linkage-parent-name="all"></td>
                    <td>Ahri</td>
                    <td>打开控制台查看选中的值</td>
                    <td>
                        <div class="more">
                            <div class="title">鼠标移出这里</div>
                            <div class="content">
                                <h3>罗梅洛</h3>
                                <p>32 岁的罗梅洛是个自大的游戏设计师，他那坏孩子般的形象使他成为了游戏界的明星，为了实现他心目中那些狂野的幻景，他愿意付出一切代价，甚至是他的名望。</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="operation">
                            <a href="javascript: void(0);">详情</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" value="Akali" data-linkage-parent-name="all"></td>
                    <td>Akali</td>
                    <td>增强了 Table 的样式和事件</td>
                    <td>
                        <div class="more">
                            <div class="title">卡马克在他们分手时...</div>
                            <div class="content">
                                <p>卡马克在他们分手时有过一句简短的描述：“罗梅洛想建立一个帝国，而我只想写出优秀的程序。” </p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="operation">
                            <a href="javascript: void(0);">详情</a>
                            <a href="javascript: void(0);">详情</a>
                            <a href="javascript: void(0);">详情</a>
                            <a href="javascript: void(0);">链接不会折行</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader', 'log'], function(Loader, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/table')
            instances.on('toggle.table', function(event, values, target) {
                console.log('event.delegateTarget', event.delegateTarget)
                console.log('event.currentTarget', event.currentTarget)
                console.log('event.target', event.target)
                console.log('target', target)
                console.log(event.type, event.namespace, values)
            })
        })
    })
</script>

### 配置 <small>Options</small>

无。

### 方法 <small>Methods</small>

无。

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
toggle.table | 当勾选或取消勾选复选框时被触发。事件监听函数接受三个参数：`event`、`values`、`target`。参数 `values` 是一个数组，其中存放了被选中的复选框的值，没有任何复选框被选中，则为空数组 `[]`。参数 `target` 是被点击的复选框。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/table')[0]
instances.on('toggle.table', function(event, values, target) {
    console.log(event.type, event.namespace, values, target)
})
```

# linkage( container, callback( event, values ) )

联动复选框工具函数。

* linkage( container, callback( event, values ) )

首先，需要在复选框 `<input type="checkbox">` 上附加两个属性 `data-linkage-name` 和 `data-linkage-parent-name`，分别表示当前复选框和父级复选框的唯一标识。例如：

```html
<label>
    <input type="checkbox" data-linkage-name="all"> All
</label>
<label>
    <input type="checkbox" data-linkage-name="item0" data-linkage-parent-name="all"> item 0
</label>
<label>
    <input type="checkbox" data-linkage-name="item1" data-linkage-parent-name="all"> item 1
</label>
```

然后，执行下面的代码，使容器元素 `container` 中的复选框的选中状态联动更新。如果子级复选框全部选中，则自动选中父级复选框；如果选中父级复选框，则自动选中全部子级复选框。

```js
require(['components/table/linkage'], function(linkage) {
    linkage('#container', function(event, values) {
        console.log(event, values)
    })
})
```

每当有复选框被点击时，会触发回调函数 `callback( event, values )`。其中，参数 `event` 是一个 [jQuery Event 对象](http://api.jquery.com/category/events/event-object/)，参数 `values` 是一个数组，包含了所有被选中复选框的值（即属性 `value`）。

### 示例 <small>Examples</small>

<div class="bs-example bs-example-modal">
    <div class="content">
        <div id="sexLinkage" bx-name>
            <label><input type="checkbox" data-linkage-name="all"> All</label>
            <ul>
                <li>
                    <label><input type="checkbox" value="1" data-linkage-name="1" data-linkage-parent-name="all"> 1</label>
                    <ul>
                        <li><label><input type="checkbox" value="1.1" data-linkage-name="1.1" data-linkage-parent-name="1"> 1.1</label></li>
                        <li><label><input type="checkbox" value="1.2" data-linkage-name="1.2" data-linkage-parent-name="1"> 1.2</label></li>
                        <li><label><input type="checkbox" value="1.3" data-linkage-name="1.3" data-linkage-parent-name="1"> 1.3</label></li>
                    </ul>
                </li>
                <li>
                    <label><input type="checkbox" data-linkage-name="2" data-linkage-parent-name="all"> 不限</label>
                    <label><input type="checkbox" value="2.1" data-linkage-name="2.1" data-linkage-parent-name="2"> 2.1</label>
                    <label><input type="checkbox" value="2.2" data-linkage-name="2.2" data-linkage-parent-name="2"> 2.2</label>
                    <label><input type="checkbox" value="2.3" data-linkage-name="2.3" data-linkage-parent-name="2"> 2.3</label>
                </li>
                <li>
                    <label><input type="checkbox" value="2.1" data-linkage-name="2.1" data-linkage-parent-name="2"> 2.1</label>
                    <label><input type="checkbox" value="2.2" data-linkage-name="2.2" data-linkage-parent-name="2"> 2.2</label>
                    <label><input type="checkbox" value="2.3" data-linkage-name="2.3" data-linkage-parent-name="2"> 2.3</label>
                </li>
                <li>
                    <label><input type="checkbox" data-linkage-name="3" data-linkage-parent-name="all"> 不限</label>
                    <label><input type="checkbox" value="2.1" data-linkage-name="2.1" data-linkage-parent-name="3"> 2.1</label>
                    <label><input type="checkbox" value="2.2" data-linkage-name="2.2" data-linkage-parent-name="3"> 2.2</label>
                    <label><input type="checkbox" value="2.3" data-linkage-name="2.3" data-linkage-parent-name="3"> 2.3</label>
                </li>
            </ul>
        </div>
    </div>
</div>

```js
require(['components/table/linkage'], function(linkage) {
    linkage('#sexLinkage', function(event, values, target) {
        console.log(event, values, target)
    })
})
```

<script type="text/javascript">
    require(['components/table/linkage'], function(linkage) {
        linkage('#sexLinkage', function(event, values, target) {
            console.log(event, values, target)
        })
    })
</script>
