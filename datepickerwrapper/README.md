# DatePickerWrapper

日期选择器。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
    	<input bx-name="components/datepickerwrapper" type="text" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
    	<a bx-name="components/datepickerwrapper" href="javascript: void(0);">请选择日期</a>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/datepickerwrapper" data-dates="[ '2014-11-06', '2014-11-07', '2014-11-08' ]" class="form-control">
        	<span>0</span> - <span>1</span>
        </div>
    </div>
</div>

<script type="text/javascript">
    require(['loader', 'log'], function(Loader, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/datepickerwrapper')
            instances.on('change.datepickerwrapper', function(event, dates) {
                log(
                    '_' + event.type + '_ ' + 
                    '*' + event.namespace + '* ' + 
                    _.map(dates, function(item) {
                        return item.format('YYYY-MM-DD HH:mm:ss.SSS')
                    }).join(' ')
                )
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

**配置 `shortcut`**

```json
{}
```

### 方法 <small>Methods</small>

无。

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change.datepickerwrapper | 当日期组件变化时被触发。
