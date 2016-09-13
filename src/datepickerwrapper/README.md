# DatePickerWrapper

日期选择器。

```html
<input bx-name="components/datepickerwrapper" type="text" class="form-control w100">

<div bx-name="components/datepickerwrapper" 
    data-dates="[ '2015-1-1', '2015-1-2']" 
    class="form-control datepickerwrapper-trigger">
    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
    <i class="brixfont pull-right ml5 down">&#xe623;<!--&#xe623;--></i>
    <i class="brixfont pull-right ml5 up">&#xe62e;<!--&#xe62e;--></i>
</div>
```

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项    | 类型              | 默认值   | 说明
:-------- | :---------------- | :------- | :----------
shortcuts | boolean or object | `{}`     | 指示是否开启快捷日期和快捷日期的内容。格式见下面的代码。
dates     | array             | `[]`     | 初始日期。
ranges    | array             | `[]`     | 设置可选日期的范围。合法值参见 [DatePicker](./readme.html?name=DatePicker)。
excludeds | array             | `[]`     | 设置禁选日期的范围。合法值同 `ranges`，参见 [DatePicker](./readme.html?name=DatePicker)。
align     | string            | `'left'` | 指定浮层的对齐方式，可选值有 `'left'`、`'right'`。

### 配置项 `shortcuts`

```js
{
    '春节': [
        '2015-2-18',
        '2015-2-24'
    ],
    '今天': [
        new Date(),
        new Date()
    ],
    '昨天': [
        moment().startOf('day').subtract(1, 'days'),
        moment().startOf('day').subtract(1, 'days')
    ]
}
```

## 方法

### .shortcutText( dates )

* .shortcutText( dates )

获取日期对应的快捷日期文本。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/datepickerwrapper')
_.each(instances, function(picker, index) {
    picker.on('change.datepickerwrapper', function(event, dates) {
        var shortcutText = picker.shortcutText(dates)
        if( shortcutText ) {
            event.preventDefault()
            picker.$element.text(shortcutText)
        }
    })
})
```

### .val( [ value ] )

* .val()
* .val( value )

获取或设置选中的日期。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/datepickerwrapper')
var current = instances[0].val()
current.forEach(function(item, index){
    console.log(index, item.format('YYYY-MM-DD HH:mm:ss.SSS'))
})
current[0].add(1, 'year')
instances[0].val(current)
```

> 方法 `.val()` 返回一个 [moment 对象]数组。

[moment 对象]: http://momentjs.com/docs/

### .range( [ value ] )

.range( [ value ] )

* .range()
* .range( value )

获取或设置可选日期的范围。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/datepickerwrapper')
var range = instances[6].range()
range.forEach(function(item, index){
    console.log(index, item.format('YYYY-MM-DD HH:mm:ss.SSS'))
})
range[0].add(1, 'year')
instances[6].range([new Date(), '2015-12-31'])
```

### .excluded( [ value ] )

.excluded( [ value ] )

* .excluded()
* .excluded( value )

获取或设置禁选日期的范围。

```js
var moment = require('moment')
var Loader = require('brix/loader')
var instances = Loader.query('components/datepickerwrapper')
instances[0].excluded([new Date()])
var excluded = instances[0].excluded()
excluded.forEach(function(item, index){
    console.log(index, moment(item).format('YYYY-MM-DD HH:mm:ss.SSS'))
})
```

## 事件

事件类型                 | 说明
:----------------------- | :----------
change.datepickerwrapper | 当日期组件变化时被触发。事件监听函数接受 3 个参数：event、dates。参数 `event` 是一个 [jQuery 事件对象]；参数 `dates` 是一个 [moment 对象数组]。

[jQuery 事件对象]: http://api.jquery.com/category/events/event-object/
[moment 对象数组]: http://momentjs.com/docs/

> 如果在事件 `change.datepickerwrapper` 的监听函数中调用了 `event.preventDefault()`，则不会更新组件的内容。该功能可以用于日期的验证。

## 示例

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
