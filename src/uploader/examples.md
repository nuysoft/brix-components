## 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <form>
            <div class="row">
                <div class="col-xs-6">
                    <h4>通过 `data-action` 指定接收文件的 URL</h4>
                    <button bx-name="components/uploader" data-action="api/upload.json" data-name="foo" type="button" class="btn btn-default">选择文件</button>
                    <div class="preview"></div>
                </div>
                <div class="col-xs-6">
                    <h4>通过 `data-name` 指定文件域的名称</h4>
                    <button bx-name="components/uploader" data-action="api/upload.json" data-name="bar" type="button" class="btn btn-default">选择文件</button>
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
