# DialogView

Magix View 对话框。{ .lead }

<pre>
require(['components/dialogview'])
var DialogView = require('components/dialogview')
var dialogOptions = {
    left: 100,
    top: 100
}
var viewName = 'todo'
var viewOptions = {}
var dialog = new DialogView(dialogOptions, viewName, viewOptions)
dialog.open()
</pre>