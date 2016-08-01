# DialogView

Magix View 对话框。{ .lead }

<script type="text/javascript">
	require(['magix'], function(Magix) {
		window.Magix = Magix
		Magix.start({
			error: function(e) {
				console && console.error(e.stack) // 将错误抛出来
			},
			iniFile: '' // 配置在ini.js里
		});
	});
</script>

<pre>
require(['components/dialogview'])
var DialogView = require('components/dialogview')
var dialogOptions = {}
var viewName = ''
var viewOptions = {}
DialogView.open(dialogOptions, viewName, viewOptions)
DialogView.close()
</pre>