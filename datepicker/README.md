# DatePicker

日期选择器。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <h4>日期 + 时间</h4>
        <div bx-name="components/datepicker" data-type="all"></div>
    </div>
</div>
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
date | date | `new Date()` | 当前日期。
type | string | `'all'` | 指定日期选择器的类型，可选值有 `'date'`、`'year'`、`'month'`、`'time'`。

### 方法 <small>Methods</small>

无。

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change | 当日期组件变化时被触发。
