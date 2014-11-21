# Uploader

上传组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <form>
            <button bx-name="components/uploader" data-action="api/upload.json" class="btn btn-default">选择文件</button>
            <div class="preview"></div>
        </form>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <form>
                    <h4>bx-options + iframe</h4>  
                    <button bx-name="components/uploader" bx-options="{
                        name: 'file1',
                        action: './package.json',
                        transport: 'iframe'
                    }" type="button" class="btn btn-default"><span class="glyphicon glyphicon-open"></span> 选择文件</button>
                    <div class="preview"></div>
                </form>
            </div>
            <div class="col-xs-6">
                <form>
                    <h4>bx-options + xhr</h4>  
                    <button bx-name="components/uploader" bx-options="{
                        name: 'file2',
                        action: 'api/upload.json',
                        transport: 'xhr'
                    }" type="button" class="btn btn-default"><span class="glyphicon glyphicon-open"></span> 选择文件</button>
                    <div class="preview"></div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <form>
                    <h4>data-\* + iframe</h4>  
                    <button bx-name="components/uploader" data-name="file3" data-action="api/upload.json" data-transport="iframe" type="button" class="btn btn-default"><span class="glyphicon glyphicon-open"></span> 选择文件</button>
                    <div class="preview"></div>
                </form>
            </div>
            <div class="col-xs-6">
                <form>
                    <h4>data-\* + xhr</h4>  
                    <button bx-name="components/uploader" data-name="file4" data-action="api/upload.json" data-transport="xhr" type="button" class="btn btn-default"><span class="glyphicon glyphicon-open"></span> 选择文件</button>
                    <div class="preview"></div>
                </form>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader', 'jquery', 'underscore', 'log'], function(Loader, $, _, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/uploader')
            instances.on('start.uploader', function(event, files) {
                console.log(event.type, event.namespace)
                var preview = $(event.target).parent().find('div.preview')
                _.each(files, function(file /*, index*/ ) {
                    var reader = new FileReader()
                    reader.onload = function(event) {
                        $('<img>')
                            .addClass('uploader-preview')
                            .attr('src', event.target.result)
                            .attr('title', file.name)
                            .appendTo(preview)
                    }
                    reader.readAsDataURL(file)
                })
                // event.preventDefault()
            })
            instances.on('success.uploader', function(event, files, response) {
                console.log(event.type, event.namespace)
            })
            instances.on('error.uploader', function(event, files, error) {
                console.log(event.type, event.namespace)  
            })
            instances.on('complete.uploader', function(event, files) {
                console.log(event.type, event.namespace)
            })
        })
    })
</script>

### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
action | string | `''` | 指定接收文件的 URL。
name | string | `'file'` | 指定文件域的名称。
transport | string | `'iframe'` | 指定上传文件的方式，可选值有 `'iframe'`、`'xhr'`。

### 方法 <small>Methods</small>

无。

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
success.uploader | 上传成功。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和响应内容 `response`。
error.uploader | 上传失败。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和错误描述 `response`。
complete.uploader | 上传完成。监听函数接受 2 个参数：jQuery 事件对象 `event` 和上传的文件数组 `files` 。
start.uploader | 开始上传，如果返回 false，则终止上传。监听函数接受 2 个参数：jQuery 事件对象 `event` 和上传的文件数组 `files` 。

> 如果在事件 `start.uploader` 的监听函数中调用了 `event.preventDefault()`，则立即终止上传。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/uploader')
instances.on('success.uploader error.uploader complete.uploader start.uploader', function(event, extra) {
    console.log(event.type, event.namespace, extra)
})
```
