# DatePicker

日期选择器。

> 依赖 <http://momentjs.com/>。

```html
<!-- 日期 -->
<div bx-name="components/datepicker" data-type="date"></div>
<!-- 时间 -->
<div bx-name="components/datepicker" data-type="time"></div>
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项   | 类型           | 默认值       | 说明
:------- | :------------- | :----------- | :----------
date     | string         | `new Date()` | 当前选中的日期。
type     | string         | `'all'`      | 指定日期选择器的类型，可选值有 `'all'`、`'date'`、`'month'`、`'year'`、`'time'`、`'hour'`、`'minute'`、`'second'`。多个类型之间用空格隔开。
range    | array          | `[]`         | 设置可选日期的范围。下面列举了一些合法值。
excluded | array or false | `false`      | 设置禁选日期的范围。合法值同 `range`。

### 配置项 `type`

值             | 说明
:------------- | :----------
`'all'`        | 年份 + 月份 + 天 + 小时 + 分钟 + 秒。默认值。等同于 `'date time'`
`'date'`       | 年份 + 月份 + 天。
`'month'`      | 年份 + 月份。
`'year'`       | 年份。
`'time'`       | 小时 + 分钟 + 秒。
`'hour'`       | 小时。
`'minute'`     | 小时 + 分钟。
~~`'second'`~~ | ~~小时 + 分钟 + 秒。等同于 `'time'`。~~

### 配置项 `range`

* `['2015-1-1']`
    
    可选日期从 `2015-1-1` 开始，包括 `2015-1-1`。

* `[undefined, '2015-3-14']`

    可选日期截至 `2015-3-14`，包括 `2015-3-14`。

* `['2015-1-1', '2015-3-14']`

    可选日期从 `2015-1-1` 开始，截至 `2015-3-14`。

* `[['2015-1-1', '2015-2-19'], ['2015-2-25', '2015-3-14']]`

    设置了两段可选范围，第一段从 `2015-1-1` 至 `2015-2-19`，第二段从 `2015-2-25` 至 `2015-3-14`。

* `[['2015-1-1', '2015-2-19'], ['2015-2-25']]`

    设置了两段可选范围，第一段从 `2015-1-1` 至 `2015-2-19`，第二段从 `2015-2-25` 开始。

* `[[undefined, '2015-2-19'], ['2015-2-25']]`

    设置了两段可选范围，第一段截至 `2015-2-19`，第二段从 `2015-2-25` 开始。

## 方法

### .val( [ value ] )

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

> 方法 `.val()` 返回一个 [moment 对象]。

[moment 对象]: http://momentjs.com/docs/

#### .range( [ value ] )

.range( [ value ] )

* .range()
* .range( value )

获取或设置可选日期的范围。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/datepicker')
var range = instances[0].range()
console.log(range)
instances[0].range([new Date(), '2015-12-31'])
```

#### .excluded( [ value ] )

.excluded( [ value ] )

* .excluded()
* .excluded( value )

获取或设置禁选日期的范围。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/datepicker')
var excluded = instances[0].excluded()
console.log(excluded)
instances[0].excluded([new Date(), '2015-12-31'])
```

## 事件

事件类型          | 说明
:---------------- | :----------
change.datepicker | 当日期组件变化时被触发。事件监听函数接受 3 个参数：`event`、`date`、`type`。参数 `event` 是一个 [jQuery 事件对象]；参数 `date` 是一个 [moment 对象]；参数 `type` 指示了发生变化的属性，可选值有：年份 `'year'`、月份 `'month'`、日 `'date'`、时间 `'time'`、小时 `'hour'`、分 `'minute'`、秒 `'second'`、`undefined`。

[jQuery 事件对象]: http://api.jquery.com/category/events/event-object/

> 当执行 `.val( value )` 时，事件 `change.datepicker` 的参数 `type` 为 `undefined`。

> 当点击时间区域的『确定』按钮时，事件 `change.datepicker` 的参数 `type` 为 `'time'`。**只有在组件 DatePickerWrapper 中才会用到。**

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/datepicker')
instances.on('change.datepicker', function(event, date, type) {
    var pattern = 'YYYY-MM-DD HH:mm:ss.SSS'
    console.log(event.type, event.namespace, type, date.format(pattern))
})
// =>
//  change datepicker date 2015-01-08 22:52:53.129
```

## 示例

[examples.html](./examples.html)

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
