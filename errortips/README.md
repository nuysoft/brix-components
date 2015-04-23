# Hello

Brix 组件实现示例。{ .lead }

### 示例 <small>Examples</small>



<div class="bs-example">
    <div class="content">
        <a href="javascript:;" bx-name="components/errortips" bx-options="{duration:2000,width:200}" mx-click="confirm" class="btn btn-primary">Submit</a>
    </div>
</div>

<script type="text/javascript">
	require(['brix/loader', 'brix/event'], function(Loader, EventManager) {
		var manager = new EventManager('mx-')
		var owner = {
			confirm: function(event){
				var instance = Loader.query(event.currentTarget)[0]
				instance.showTips(Math.random())
			}
		}
		manager.delegate($('.bs-example'), owner)
	})
</script>

### 配置 <small>Options</small>

width: 180, //提示框的宽度,
msg: '操作<span>不正确</span>，请重新操作', //提示文案，支持标签,
duration: 2000, //提示持续的时间,
btnShake: true //按钮是否抖动反馈,

Name | Type | Default | Description
:--- | :--- | :------ | :----------
width | number | `180` | 提示框的宽度
msg | string | `'操作<span>不正确</span>，请重新操作'` | 提示文案，支持html标签
duration | number | `2000` | 提示持续的时间
btnShake | boolean | `true` | 按钮是否抖动反馈, 为false则只给出提示框

### 方法 <small>Methods</small>

#### .showTips( message )

提示框里的错误提示信息，支持html标签

```js
var Loader = require('brix/loader')
var instance = Loader.query(e.currentTarget)
instance.showTips('这里显示的是错误提示信息')
```
另一种调用方式：new
```js
var instance = new ErrorTips(e.currentTarget, options)
instance.showTips('这里显示的是错误提示信息')
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
complete | 提示信息整个动画完成后的事件触发


> none
