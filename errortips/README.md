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

Lorem ipsum.

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | any | `{}` | 渲染组件所需的数据。
template | string | `''` | 自定义的组件 HTML 模板文件。
css | string | `''` | 自定义的组件 CSS 样式文件。
message | string | `''` | 指定输出的文本。

### 方法 <small>Methods</small>

#### .say( message )

在页面上输出 `Hello <%= message %>!`

```js
var Loader = require('brix/loader')
var instance = Loader.query('components/hello')
instance.say('Brix')
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
ready | 当前组件完全渲染完成后触发，包括子组件的渲染。
destroyed | 当前组件销毁后触发，包括子组件的销毁。


> 这里仅仅约束了文档的格式，关于 Hello 组件的任何说明都是胡言乱语。