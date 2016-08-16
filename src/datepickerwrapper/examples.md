## 示例

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>为 input 元素绑定日期选择器。</h4>
                <input bx-name="components/datepickerwrapper" type="text" class="form-control w100">
            </div>
            <div class="col-xs-6">
                <h4>为 input 元素绑定日期选择器。</h4>
                <input bx-name="components/datepickerwrapper" 
                    data-pages="2" 
                    data-placement="top"
                    data-align="right" 
                    type="text" 
                    class="form-control w100">
            </div>
            <div class="col-xs-6">
                <h4>为任意元素绑定日期选择器。</h4>
                <a bx-name="components/datepickerwrapper" href="javascript: void(0);">请选择日期</a>
            </div>
            <div class="col-xs-6">
                <h4>自定义样式。</h4>
                <a bx-name="components/datepickerwrapper" href="javascript: void(0);">
                    <span data-index="0">请选择日期</span>
                    <i class="brixfont down">&#xe623;<!--&#xe623;--></i>
                    <i class="brixfont up">&#xe62e;<!--&#xe62e;--></i>
                </a>
            </div>
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>绑定 2 个日期选择器。</h4>
                <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" class="form-control datepickerwrapper-trigger">
                    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
                    <i class="brixfont pull-right ml5 down">&#xe623;<!--&#xe623;--></i>
                    <i class="brixfont pull-right ml5 up">&#xe62e;<!--&#xe62e;--></i>
                </div>
            </div>
            <div class="col-xs-6">
                <h4>自定义快捷日期。</h4>
                <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" 
                    bx-options="{ 
                        shortcuts:{
                            '一期':['2015-1-1 8:00:00', '2015-3-14 18:00:00']
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

<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>事件 active、inactive。</h4>
                <div bx-name="components/datepickerwrapper" type="text" class="form-control w100 cursor-pointer demo-active"></div>
            </div>
            <div class="col-xs-6">
                <h4>事件 active、inactive。</h4>
                <div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" class="form-control w300 cursor-pointer demo-active">
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
                <h4>日期 + 时间</h4>
                <input bx-name="components/datepickerwrapper" type="text" data-type="date time" data-dates="[ '2015-1-1 1:1:1' ]" class="form-control w200">
            </div>
            <div class="col-xs-6">
                <h4>日期 + 时间（小时可修改，分钟和秒不可修改）</h4>
                <input bx-name="components/datepickerwrapper" type="text" data-type="date hour" data-dates="[ '2015-1-1 1:1:1' ]" class="form-control w200">
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>多个日期 + 时间</h4>
                <input bx-name="components/datepickerwrapper" type="text" data-type="date time" data-dates="[ '2015-1-1 1:1:1', '2016-1-1 1:1:1' ]" class="form-control w300">
            </div>
            <div class="col-xs-6">
                <h4>多个日期 + 时间（小时可修改，分钟和秒不可修改）</h4>
                <input bx-name="components/datepickerwrapper" type="text" data-type="date hour" data-dates="[ '2015-1-1 1:1:1', '2016-1-1 1:1:1' ]" class="form-control w300">
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <h4>位于下方 + 左侧对齐（默认）</h4>
                <input bx-name="components/datepickerwrapper" type="text" data-dates="[ '2015-1-1', '2016-1-1' ]" data-align="left" class="form-control w300">
            </div>
            <div class="col-xs-6">
                <h4>位于下方 + 右侧对齐</h4>
                <input bx-name="components/datepickerwrapper" type="text" data-dates="[ '2015-1-1', '2016-1-1' ]" data-align="right" class="form-control w300">
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
                        return item.format('YYYY-MM-DD HH:mm:ss.SSS')
                    })
                )
                // event.preventDefault()
            })
        })
    })
    require(['brix/loader', 'underscore'], function(Loader, _) {
        Loader.boot(function() {
            var target = $('.demo-active')
            var targetInstances = Loader.query(target)
            _.each(targetInstances, function(instance){
                instance.on('active.datepickerwrapper', function(event) {
                    $(instance.element).addClass('focus')
                    console.log(event.type, event.namespace, instance.element)
                })
                instance.on('inactive.datepickerwrapper', function(event) {
                    $(instance.element).removeClass('focus')
                    console.log(event.type, event.namespace, instance.element)
                })
            })
        })
    })
</script>

<style type="text/css">
    .demo-active.focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
    }
</style>

```html
<!-- 为 input 元素绑定日期选择器。 -->
<input bx-name="components/datepickerwrapper" type="text" class="form-control w100">
<!-- 为任意元素绑定日期选择器。 -->
<a bx-name="components/datepickerwrapper" href="javascript: void(0);">请选择日期</a>
<!-- 自定义样式。 -->
<a bx-name="components/datepickerwrapper" href="javascript: void(0);">
    <span data-index="0">请选择日期</span>
    <i class="brixfont down">&#xe623;<!--&#xe623;--></i>
    <i class="brixfont up">&#xe62e;<!--&#xe62e;--></i>
</a>

<!-- 绑定 2 个日期选择器。 -->
<div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" class="form-control datepickerwrapper-trigger">
    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
    <i class="brixfont pull-right ml5 down">&#xe623;<!--&#xe623;--></i>
    <i class="brixfont pull-right ml5 up">&#xe62e;<!--&#xe62e;--></i>
</div>

<!-- 自定义快捷日期。 -->
<div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" 
    bx-options="{ 
        shortcuts:{
            '一期': ['2015-1-1 8:00:00', '2015-3-14 18:00:00']
        }
    }"
    class="form-control w300">
    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
</div>

<!-- 绑定 3 个日期选择器。 -->
<div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2', '2015-1-3' ]" class="form-control w300">
    <span data-index="0">2015-1-1</span>,
    <span data-index="1">2015-1-2</span>,
    <span data-index="2">2015-1-3</span>
</div>

<!-- 自定义快捷日期。 -->
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

<!-- 设置可选范围：最小日期（单个日期选择器）。 -->
<input bx-name="components/datepickerwrapper" 
    data-ranges="[[new Date(), '2015-3-14']]" 
    type="text" class="form-control w100">

<!-- 设置可选范围：最小日期（多个日期选择器）。 -->
<div bx-name="components/datepickerwrapper" 
    data-dates="[ '2015-1-1', '2015-1-2' ]" 
    data-ranges="[[ '2015-1-1', '2015-1-2' ]]" 
    class="form-control w300">
    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
</div>

<!-- 支持不限（单个日期选择器）。 -->
<input bx-name="components/datepickerwrapper" 
    data-unlimits="[ '2099-1-1' ]" 
    type="text" class="form-control w100">

<!-- 支持不限（多个日期选择器）。 -->
<div bx-name="components/datepickerwrapper" 
    data-dates="[ '2015-1-1', '2015-1-2' ]" 
    data-unlimits="[ undefined, '2099-1-1' ]" 
    class="form-control w300">
    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
</div>

<!-- 单个日期选择器：自动触发 input 元素的 change 事件。 -->
<input bx-name="components/datepickerwrapper" 
    data-unlimits="[ '2099-1-1' ]"
    onchange="alert(this.value)"
    type="text" class="form-control w100">

<!-- 单个日期选择器：自动同步至隐藏域，并触发隐藏域的 change 事件。 -->
<a bx-name="components/datepickerwrapper" href="javascript: void(0);">
    <input type="hidden" data-hidden-index="0" onchange="alert(this.value)">
    请选择日期
</a>

<!-- 多个日期选择器：自动同步至隐藏域，并触发隐藏域的 change 事件。 -->
<div bx-name="components/datepickerwrapper" 
    data-dates="[ '2015-1-1', '2015-1-2']" 
    class="form-control w300">
    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
    <input type="hidden" data-hidden-index="0" onchange="alert(this.value)">
    <input type="hidden" data-hidden-index="1" onchange="alert(this.value)">
</div>

<!-- 对于不限，隐藏域的值是真实日期。 -->
<div bx-name="components/datepickerwrapper" 
    data-dates="[ '2015-1-1', '2015-1-2']" 
    data-unlimits="[ undefined, '2099-1-1' ]" 
    class="form-control w300">
    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
    <input type="hidden" data-hidden-index="0" onchange="alert(this.value)">
    <input type="hidden" data-hidden-index="1" onchange="alert(this.value)">
</div>

<!-- 事件 active、inactive。 -->
<div bx-name="components/datepickerwrapper" type="text" class="form-control w100 cursor-pointer demo-active"></div>

<!-- 事件 active、inactive。 -->
<div bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" class="form-control w300 cursor-pointer demo-active">
    <span data-index="0">2015-1-1</span> 至 <span data-index="1">2015-1-2</span>
</div>

<!-- 日期 + 时间 -->
<input bx-name="components/datepickerwrapper" type="text" data-type="date time" data-dates="[ '2015-1-1 1:1:1' ]" class="form-control w200">

<!-- 日期 + 时间（小时可修改，分钟和秒不可修改） -->
<input bx-name="components/datepickerwrapper" type="text" data-type="date hour" data-dates="[ '2015-1-1 1:1:1' ]" class="form-control w200">

<!-- 多个日期 + 时间 -->
<input bx-name="components/datepickerwrapper" type="text" data-type="date time" data-dates="[ '2015-1-1 1:1:1', '2016-1-1 1:1:1' ]" class="form-control w300">

<!-- 多个日期 + 时间（小时可修改，分钟和秒不可修改） -->
<input bx-name="components/datepickerwrapper" type="text" data-type="date hour" data-dates="[ '2015-1-1 1:1:1', '2016-1-1 1:1:1' ]" class="form-control w300">

<!-- 位于下方 + 左侧对齐（默认） -->
<input bx-name="components/datepickerwrapper" type="text" data-dates="[ '2015-1-1', '2016-1-1' ]" data-align="left" class="form-control w300">

<!-- 位于下方 + 右侧对齐 -->
<input bx-name="components/datepickerwrapper" type="text" data-dates="[ '2015-1-1', '2016-1-1' ]" data-align="right" class="form-control w300">
```

```js
require(['brix/loader'], function(Loader) {
    Loader.boot(function() {
        var instances = Loader.query('components/datepickerwrapper')
        instances.on('change.datepickerwrapper', function(event, dates) {
            console.log(
                event.type,
                event.namespace,
                _.map(dates, function(item) {
                    return item.format('YYYY-MM-DD HH:mm:ss.SSS')
                })
            )
            // event.preventDefault()
        })
    })
})
require(['brix/loader', 'underscore'], function(Loader, _) {
    Loader.boot(function() {
        var target = $('.demo-active')
        var targetInstances = Loader.query(target)
        _.each(targetInstances, function(instance){
            instance.on('active.datepickerwrapper', function(event) {
                $(instance.element).addClass('focus')
                console.log(event.type, event.namespace, instance.element)
            })
            instance.on('inactive.datepickerwrapper', function(event) {
                $(instance.element).removeClass('focus')
                console.log(event.type, event.namespace, instance.element)
            })
        })
    })
})
```

<style type="text/css">
    .demo-active.focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
    }
</style>
