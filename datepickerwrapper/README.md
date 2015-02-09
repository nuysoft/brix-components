# DatePickerWrapper

日期选择器。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>为 input 元素绑定日期选择器。</h4>
                <input bx-name="components/datepickerwrapper" type="text" class="form-control w100">
            </div>
            <div class="col-xs-6">
                <h4>为任意元素绑定日期选择器。</h4>
                <a bx-name="components/datepickerwrapper" href="javascript: void(0);">请选择日期</a>
            </div>
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>绑定 2 个日期选择器。</h4>
                <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" class="form-control w300">
                    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                </div>
            </div>
            <div class="col-xs-6">
                <h4>自定义快捷日期。</h4>
                <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" 
                    bx-options="{ 
                        shortcuts:{
                            '一期':['2015-1-1', '2015-3-14']
                        }
                    }"
                    class="form-control w300">
                    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>绑定 3 个日期选择器。</h4>
                <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2', '2015-1-3' ]" class="form-control w300">
                    <span data-index="0">2015-1-1</span>,
                    <span data-index="1">2015-1-2</span>,
                    <span data-index="2">2015-1-3</span>
                </div>
            </div>
            <div class="col-xs-6">
                <h4>自定义快捷日期。</h4>
                <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2', '2015-1-3' ]" 
                    bx-options="{ 
                        shortcuts:{
                            '一期':['2015-1-1', '2015-3-14', '2015-6-1']
                        }
                    }"
                    class="form-control w300">
                    <span data-index="0">2015-1-1</span>,
                    <span data-index="1">2015-1-2</span>,
                    <span data-index="2">2015-1-3</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>设置可选范围：最小日期（单个日期选择器）。</h4>
                <input bx-name="components/datepickerwrapper" 
                    data-ranges="[[new Date(), '2015-3-14']]" 
                    type="text" class="form-control w100">
            </div>
            <div class="col-xs-6">
                <h4>设置可选范围：最小日期（多个日期选择器）。</h4>
                <div bx-name="components/datepickerwrapper" 
                    data-dates="[ '2015-1-1', '2015-1-2' ]" 
                    data-ranges="[[ '2015-1-1', '2015-1-2' ]]" 
                    class="form-control w300">
                    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>支持不限（单个日期选择器）。</h4>
                <input bx-name="components/datepickerwrapper" 
                    data-unlimits="[ '2099-1-1' ]" 
                    type="text" class="form-control w100">
            </div>
            <div class="col-xs-6">
                <h4>支持不限（多个日期选择器）。</h4>
                <div bx-name="components/datepickerwrapper" 
                    data-dates="[ '2015-1-1', '2015-1-2' ]" 
                    data-unlimits="[ undefined, '2099-1-1' ]" 
                    class="form-control w300">
                    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>单个日期选择器：自动触发 input 元素的 change 事件。</h4>
                <input bx-name="components/datepickerwrapper" 
                    data-unlimits="[ '2099-1-1' ]"
                    onchange="alert(this.value)"
                    type="text" class="form-control w100">
            </div>
            <div class="col-xs-6">
                <h4>单个日期选择器：自动同步至隐藏域，并触发隐藏域的 change 事件。</h4>
                <a bx-name="components/datepickerwrapper" href="javascript: void(0);">
                    <input type="hidden" data-hidden-index="0" onchange="alert(this.value)">
                    请选择日期
                </a>
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>多个日期选择器：自动同步至隐藏域，并触发隐藏域的 change 事件。</h4>
                <div bx-name="components/datepickerwrapper" 
                    data-dates="[ '2015-1-1', '2015-1-2']" 
                    class="form-control w300">
                    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                    <input type="hidden" data-hidden-index="0" onchange="alert(this.value)">
                    <input type="hidden" data-hidden-index="1" onchange="alert(this.value)">
                </div>
            </div>
            <div class="col-xs-6">
                <h4>对于不限，隐藏域的值是真实日期，。</h4>
                <div bx-name="components/datepickerwrapper" 
                    data-dates="[ '2015-1-1', '2015-1-2']" 
                    data-unlimits="[ undefined, '2099-1-1' ]" 
                    class="form-control w300">
                    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                    <input type="hidden" data-hidden-index="0" onchange="alert(this.value)">
                    <input type="hidden" data-hidden-index="1" onchange="alert(this.value)">
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader'], function(Loader) {
        Loader.boot(function() {
            var instances = Loader.query('components/datepickerwrapper')
            instances.on('change.datepickerwrapper', function(event, dates) {
                console.log(
                    event.type,
                    event.namespace,
                    _.map(dates, function(item) {
                        return item.format('YYYY-MM-DD')
                    })
                )
                // event.preventDefault()
            })
        })
    })
</script>

### 配置 <small>Options</small>

Lorem ipsum.

Name | Type | Default | Description
:--- | :--- | :------ | :----------
shortcut | boolean or object | `{}` | 指示是否开启快捷日期和快捷日期的内容。格式见下面的代码。
dates | array | `[]` | 初始日期。
ranges | array | `[]` | 设置可选日期的范围。合法值参见 [DatePicker](./readme.html?name=DatePicker)。

#### 配置项 `shortcut`

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

### 方法 <small>Methods</small>

无。

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change.datepickerwrapper | 当日期组件变化时被触发。

> 如果在事件 `change.datepickerwrapper` 的监听函数中调用了 `event.preventDefault()`，则不会更新组件的内容。该功能可以用于日期的验证。
