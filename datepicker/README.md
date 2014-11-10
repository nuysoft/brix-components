# DatePicker

日期选择器。{ .lead }

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

### 配置 <small>Options</small>

Lorem ipsum.

Name | Type | Default | Description
:--- | :--- | :------ | :----------
date | date | `new Date()` | 当前选中的日期。
type | string | `'all'` | 指定日期选择器的类型，可选值有 `'all'`、`'date'`、`'year'`、`'month'`、`'time'`。

### 方法 <small>Methods</small>

#### .val( value )

获取或设置选中的日期。

```js
var Loader = require('loader')
var instance = Loader.query('components/datepicker')
instance.on('change', function(event, extra) {
    console.log(extra)
})
var current = instance[0].val()
console.log(current.format('YYYY-MM-DD HH:mm:ss.SSS'))
current.add(1, 'year')
instance[0].val(current)
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change | 当日期组件变化时被触发。
