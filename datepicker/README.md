# DatePicker

日期选择器。{ .lead }

> 依赖 <http://momentjs.com/>。

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>日期</h4>
                <div bx-name="components/datepicker" data-type="date"></div>
            </div>
            <div class="col-xs-6">
                <h4>时间</h4>
                <div bx-name="components/datepicker" data-type="time"></div>
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>设置可选范围：最小日期</h4>
                <div bx-name="components/datepicker" data-type="date" data-range="['2014-11-5']"></div>
            </div>
            <div class="col-xs-6">
                <h4>设置可选范围：最大日期</h4>
                <div bx-name="components/datepicker" data-type="date" data-range="[undefined, '2014-11-15']"></div>
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>设置可选范围：最小日期 + 最大日期</h4>
                <div bx-name="components/datepicker" data-type="date" data-range="['2014-11-5', '2014-11-15']"></div>
            </div>
            <div class="col-xs-6">
                <h4>设置多个可选范围</h4>
                <div bx-name="components/datepicker" data-type="date" data-range="[['2014-11-5', '2014-11-10'], ['2014-11-15', '2014-11-20']]"></div>
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>设置多个可选范围</h4>
                <div bx-name="components/datepicker" data-type="date" data-range="[['2014-11-5', '2014-11-10'], ['2014-11-15']]"></div>
            </div>
            <div class="col-xs-6">
                <h4>设置多个可选范围</h4>
                <div bx-name="components/datepicker" data-type="date" data-range="[[undefined, '2014-11-10'], ['2014-11-15']]"></div>
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>年份</h4>
                <div bx-name="components/datepicker" data-type="year"></div>
            </div>
            <div class="col-xs-6">
                <h4>月份</h4>
                <div bx-name="components/datepicker" data-type="month"></div>
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>日期 + 时间</h4>
                <div bx-name="components/datepicker" data-date="2014-11-11"></div>
            </div>
            <div class="col-xs-6">
                <h4>日期 + 时间</h4>
        <div bx-name="components/datepicker" data-date="2014-12-12" data-type="all"></div>
            </div>
        </div>
    </div>
</div>

<!-- 
            // 
            // var types = 'change.datepicker ' + _.map(['date', 'month', 'year', 'hour', 'minute', 'second'], function(item, index) {
            //     return 'change.datepicker.' + item
            // }).join(' ')
            // console.log(types)
 -->
<script type="text/javascript">
    require(['brix/loader', 'log'], function(Loader, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/datepicker')
            instances.on('change.datepicker', function(event, date, type) {
                log(
                    '_' + event.type + '_ ' + 
                    '*' + event.namespace + '* ' + 
                    '*' + type + '*', 
                    date.format('YYYY-MM-DD HH:mm:ss.SSS')
                )
            })
        })
    })
</script>

### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
date | string | `new Date()` | 当前选中的日期。
type | string | `'all'` | 指定日期选择器的类型，可选值有 `'all'`、`'date'`、`'year'`、`'month'`、`'time'`。
range | array | `[]` | 设置可选日期的范围。下面列举了一些合法值。

**配置 `range`**

* `['2014-11-5']`
    
    可选日期从 `2014-11-5` 开始。

* `[undefined, '2014-11-15']`

    可选日期截至 `2014-11-15`。

* `['2014-11-5', '2014-11-15']`

    可选日期从 `2014-11-5` 开始，截至 `2014-11-15`。

* `[['2014-11-5', '2014-11-10'], ['2014-11-15', '2014-11-20']]`

    设置了两段可选范围，第一段从 `2014-11-5` 至 `2014-11-10`，第二段从 `2014-11-15` 至 `2014-11-20`。

* `[['2014-11-5', '2014-11-10'], ['2014-11-15']]`

    设置了两段可选范围，第一段从 `2014-11-5` 至 `2014-11-10`，第二段从 `2014-11-15` 开始。

* `[[undefined, '2014-11-10'], ['2014-11-15']]`

    设置了两段可选范围，第一段截至 `2014-11-10`，第二段从 `2014-11-15` 开始。

### 方法 <small>Methods</small>

#### .val( [ value ] )

* .val()
* .val( value )

获取或设置选中的日期。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/datepicker')
var current = instances[0].val()
console.log(current.format('YYYY-MM-DD HH:mm:ss.SSS'))
current.add(1, 'year')
instances[0].val(current)
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change.datepicker | 当日期组件变化时被触发。事件监听函数接受 3 个参数：`event`、`date`、`type`。参数 `date` 是一个 [moment 对象](http://momentjs.com/docs/)；参数 `type` 指示了变化的属性，可选值有 `'year'`、`'month'`、`'date'`、`'hour'`、`'minute'`、`'second'`、`undefined`。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/datepicker')
instances.on('change.datepicker', function(event, date, type) {
    var pattern = 'YYYY-MM-DD HH:mm:ss.SSS'
    console.log(event.type, event.namespace, type, date.format(pattern))
})
// =>
// change datepicker date 2014-11-13 20:31:07.988 
```
