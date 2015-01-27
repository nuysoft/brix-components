# AreaPicker

<div class="bs-example">
    <div class="content">
		<div bx-name="components/areapicker">
			[
				{ id: '一线', name: '一线' },
		        { id: '二线', name: '二线' },
		        { id: '三线', name: '三线' },

		        { id: 110000, pid: '一线', name: '北京市' },
		        { id: 120000, pid: '一线', name: '天津市' },

		        { id: 130000, pid: '二线', name: '河北省' },
		        { id: 140000, pid: '二线', name: '山西省' },

		        { id: 150000, pid: '三线', name: '内蒙古自治区' },
		        { id: 210000, pid: '三线', name: '辽宁省' },
			]
		</div>
	</div>
</div>

<script>
	require(['brix/loader'], function(Loader){
		Loader.boot(function(){
			var instances = Loader.query('components/areapicker')
			instances.on('toggle.areapicker', function(event, values) {
				console.log(event, values)
			})
		})
	})
</script>

### 示例代码：读取和设置值

```js
var Loader = require('brix/loader')
var linkage = require('components/table/linkage')
var areapicker = Loader.query('components/areapicker')[0]

// 获取选中区域
linkage.val(areapicker.element)

// 选中部分区域
linkage.val(areapicker.element, ['港澳台', '710000', '810000', '820000'])

// 清空所有区域
linkage.val(areapicker.element, [])

// 选中『港澳台』，并自动选中它的所有子级复选框
linkage.val(areapicker.element, ['港澳台'])

// 清空所有区域
linkage.val(areapicker.element, [])

// 选中『港澳台』的所有子级复选框，并自动选中『港澳台』
linkage.val(areapicker.element, ['710000', '810000', '820000'])

// 清空所有区域
linkage.val(areapicker.element, [])
```