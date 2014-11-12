# Uploader

上传组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <form>
            <button bx-name="components/uploader" data-action="api/upload.json" class="btn btn-default">选择文件</button>
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
                        action: 'api/upload.json',
                        transport: 'iframe'
                    }" type="button" class="btn btn-default"><span class="glyphicon glyphicon-open"></span> 选择文件</button>
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
                </form>
            </div>
            <div class="col-xs-6">
                <form>
                    <h4>data-\* + xhr</h4>  
                    <button bx-name="components/uploader" data-name="file4" data-action="api/upload.json" data-transport="xhr" type="button" class="btn btn-default"><span class="glyphicon glyphicon-open"></span> 选择文件</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    require(['loader', 'log'], function(Loader, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/uploader')
            instances.on('success.uploader error.uploader complete.uploader start.uploader', function(event, extra) {
                log(
                    '_' + event.type + '_ ' + 
                    '*' + event.namespace + '* ',
                    extra
                )
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
success.uploader | 上传成功。
error.uploader | 上传失败。
complete.uploader | 上传完成。
start.uploader | 开始上传，如果返回 false，则终止上传。

```js
var Loader = require('loader')
var instances = Loader.query('components/uploader')
instances.on('success.uploader error.uploader complete.uploader start.uploader', function(event, extra) {
    console.log(event.type, event.namespace, extra)
})
```

<h3><!-- 事件  -->Events</h3>
<p>Lorem ipsum.</p>
<table class="table table-bordered">
    <thead>
        <tr>
            <th align="left"> Event Type </th>
            <th align="left"> Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="left"> success.uploader </td>
            <td align="left"> 上传成功。</td>
        </tr>
        <tr>
            <td align="left"> error.uploader </td>
            <td align="left"> 上传失败。</td>
        </tr>
        <tr>
            <td align="left"> complete.uploader </td>
            <td align="left"> 上传完成。</td>
        </tr>
        <tr>
            <td align="left"> start.uploader </td>
            <td align="left"> 开始上传，如果返回 false，则终止上传。</td>
        </tr>
    </tbody>
</table>
<blockquote>
    <p>TODO</p>
</blockquote>