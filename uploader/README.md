# Uploader

上传组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <form>
            <div class="row">
                <div class="col-xs-6">
                    <h4>通过 `data-action` 指定接收文件的 URL</h4>
                    <button bx-name="components/uploader" data-action="api/upload.json" data-name="foo" class="btn btn-default">选择文件</button>
                    <div class="preview"></div>
                </div>
                <div class="col-xs-6">
                    <h4>通过 `data-name` 指定文件域的名称</h4>
                    <button bx-name="components/uploader" data-action="api/upload.json" data-name="bar" class="btn btn-default">选择文件</button>
                    <div class="preview"></div>
                </div>
            </div>
        </form>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <form>
                    <h4>通过 iframe 上传 `data-transport="iframe"`</h4>  
                    <button bx-name="components/uploader" data-name="foo" data-action="api/upload.json" data-transport="iframe" type="button" class="btn btn-default"><span class="glyphicon glyphicon-open"></span> 选择文件</button>
                    <div class="preview"></div>
                </form>
            </div>
            <div class="col-xs-6">
                <form>
                    <h4>通过 xhr 上传 `data-transport="xhr"`</h4>  
                    <button bx-name="components/uploader" data-name="bar" data-action="api/upload.json" data-transport="xhr" type="button" class="btn btn-default"><span class="glyphicon glyphicon-open"></span> 选择文件</button>
                    <div class="preview"></div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- <div class="bs-example">
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
</div> -->

<script type="text/javascript">
    require(['brix/loader', 'jquery', 'underscore', 'log'], function(Loader, $, _, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/uploader')
            instances.on('start.uploader', function(event, files) {
                console.log(event.type, event.namespace, event.component)
                var preview = $(event.target).parent().find('div.preview')
                _.each(files, function(file /*, index*/ ) {
                    var reader = new FileReader()
                    reader.onload = function(event) {
                        var $img = $('<img>')
                            .addClass('uploader-preview-thumbnail')
                            .attr('src', event.target.result)
                            .attr('title', file.name)
                            .appendTo(preview)
                            .attr('bx-name', 'components/popover')
                            .attr('data-content', '<img src="' + event.target.result + '">')
                            .attr('data-placement', 'bottom')
                            .attr('data-align', 'left')
                        Loader.boot($img)
                    }
                    reader.readAsDataURL(file)
                })
                // event.preventDefault()
            })
            instances.on('progress.uploader', function(event, files, state) {
                console.log(event.type, event.namespace, files, state.loaded + '/' + state.total + 'B', state.percent + '%')
            })
            instances.on('success.uploader', function(event, files, response) {
                console.log(event.type, event.namespace, files, response)
            })
            instances.on('error.uploader', function(event, files, reason) {
                console.log(event.type, event.namespace, files, reason)
            })
            instances.on('complete.uploader', function(event, files) {
                console.log(event.type, event.namespace, files)
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
multiple | boolean | `true` | 是否允许多选。
accept | stirng | `''` | 指定服务端可接受的文件类型，例如 `'.jpg,.png'`、`'image/*'`。详细的合法值请参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes)。

### 方法 <small>Methods</small>

#### Uploader.parseJSONResponse( response, callback )

将响应内容解析成 JSON 对象。

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
start.uploader | 开始上传，如果返回 false，则终止上传。监听函数接受 2 个参数：jQuery 事件对象 `event` 和上传的文件数组 `files` 。
progress.uploader | 上传进度。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和一个 [ProgressEvent] 事件对象 `state`。
success.uploader | 上传成功。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和响应内容 `response`。
error.uploader | 上传失败。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和错误描述 `reason`。
complete.uploader | 上传完成。监听函数接受 2 个参数：jQuery 事件对象 `event` 和上传的文件数组 `files` 。

> 如果在事件 `start.uploader` 的监听函数中调用了 `event.preventDefault()`，则立即终止上传。

> 如果通过 iframe 上传文件，则不会触发事件 `progress.uploader`。

[ProgressEvent]: https://xhr.spec.whatwg.org/#progressevent

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/uploader')
instances.on('start.uploader', function(event, files) {
    console.log(event.type, event.namespace, event.components, files)
})
instances.on('progress.uploader', function(event, files, state) {
    console.log(event.type, event.namespace, files, state)
})
instances.on('success.uploader', function(event, files, response) {
    console.log(event.type, event.namespace, files, response)
})
instances.on('error.uploader', function(event, files, reason) {
    console.log(event.type, event.namespace, files, reason)
})
instances.on('complete.uploader', function(event, files) {
    console.log(event.type, event.namespace, files)
})
```
