# Table

增强表格。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example bs-example-modal">
    <div class="content">
        <table bx-name="components/table" class="table table-hover">
            <thead>
                <tr>
                    <th><input type="checkbox"></th>
                    <th>Id</th>
                    <th>Feature <span bx-name="components/popover" data-content="功能列表。" data-placement="bottom" class="glyphicon glyphicon-question-sign gray"></span></th>
                    <th>More <span bx-name="components/popover" data-content="鼠标移入之后显示更多内容。" data-placement="bottom" class="glyphicon glyphicon-question-sign gray"></span></th>
                    <th width="150px">Operations <span bx-name="components/popover" data-content="注意到最后一列了吗？鼠标移入之后才会显示。" data-placement="bottom" class="glyphicon glyphicon-question-sign gray"></span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" value="Aatrox"></td>
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
                    <td><input type="checkbox" value="Ahri"></td>
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
                    <td><input type="checkbox" value="Akali"></td>
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
    require(['loader', 'log'], function(Loader, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/table')
            instances.on('toggle.table', function(event, values) {
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
toggle.table | 当勾选或取消勾选复选框时被触发。事件监听函数接受两个参数：`event`、`values`。参数 `values` 是一个数组，其中存放了被选中的复选框的值，没有任何复选框被选中，则为空数组 `[]`。

```js
var Loader = require('loader')
var instances = Loader.query('components/table')
instances.on('toggle.table', function(event, values) {
    console.log(event.type, event.namespace, values)
})
```
