
## 示例

```html
<!-- 日期 -->
<div bx-name="components/datepicker" data-type="date"></div>
<!-- 时间 -->
<div bx-name="components/datepicker" data-type="time"></div>
<!-- 设置可选范围：最小日期 -->
<div bx-name="components/datepicker" data-type="date" data-range="[new Date()]"></div>
<!-- 设置可选范围：最大日期 -->
<div bx-name="components/datepicker" data-type="date" data-range="[undefined, new Date()]"></div>
<!-- 设置可选范围：最小日期 + 最大日期 -->
<div bx-name="components/datepicker" data-type="date" data-range="[new Date(), '2015-3-14']"></div>
<!-- 设置多个可选范围 -->
<div bx-name="components/datepicker" data-type="date" data-range="[['2015-1-1', '2015-2-19'], ['2015-2-25', '2015-3-14']]"></div>
<!-- 设置多个可选范围 -->
<div bx-name="components/datepicker" data-type="date" data-range="[['2015-1-1', '2015-2-19'], ['2015-2-25']]"></div>
<!-- 设置多个可选范围 -->
<div bx-name="components/datepicker" data-type="date" data-range="[[undefined, '2015-2-19'], ['2015-2-25']]"></div>
<!-- 年份 -->
<div bx-name="components/datepicker" data-type="year"></div>
<!-- 月份 -->
<div bx-name="components/datepicker" data-type="month"></div>
<!-- 日期 + 时间 -->
<div bx-name="components/datepicker" data-date="2015-1-1"></div>
<!-- 日期 + 时间 -->
<div bx-name="components/datepicker" data-date="2015-1-1" data-type="all"></div>
<!-- 时间（小时可修改，分钟和秒不可修改） -->
<div bx-name="components/datepicker" data-date="2015-1-1 04:00:00" data-type="hour"></div>
<!-- 日期 + 时间（小时可修改，分钟和秒不可修改） -->
<div bx-name="components/datepicker" data-date="2015-1-1 04:00:00" data-type="date hour"></div>
<!-- 支持不限 -->
<div bx-name="components/datepicker" data-type="date" data-date="2015-1-1" data-unlimit="2099-1-1"></div>
<!-- 支持不限，初始值即为不限 -->
<div bx-name="components/datepicker" data-type="date" data-date="2099-1-1" data-unlimit="2099-1-1"></div>
```

```js
require(['brix/loader'], function(Loader) {
    Loader.boot(function() {
        var instances = Loader.query('components/datepicker')
        instances.on('change.datepicker unchange.datepicker', function(event, date, type) {
            console.log(
                event.type,
                event.namespace,
                type, 
                date.format('YYYY-MM-DD HH:mm:ss.SSS')
            )
        })
    })
})
```