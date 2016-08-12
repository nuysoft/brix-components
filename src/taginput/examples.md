<script type="text/javascript">
    // require(['brix/loader', 'underscore'], function(Loader, _){
    //     Loader.boot(function(){
    //         var instances = Loader.query('components/taginput')
    //         _.each(instances, function(item, index){
    //             item.on('active.taginput inactive.taginput', function(event) {
    //                 console.log(item.clientId, event.type, event.namespace)
    //             })    
    //         })
    //     })
    // })
</script>

## 示例

<div class="bs-example">
    <div class="content">
        <input bx-name="components/taginput" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>通过 HTML 属性 `data-data` 指定初始值。</p>
        <input bx-name="components/taginput" data-data="['foo', 'bar', 'baz']" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>通过 HTML 属性 `data-placeholder` 指定描述预期值的简短提示。</p>
        <input bx-name="components/taginput" data-placeholder="输入几个字符试试" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>可以限制词条的个数。</p>
        <input bx-name="components/taginput" data-limit="3" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>不允许增加重复值。</p>
        <input bx-name="components/taginput" data-limit="3" data-same="false" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>设置属性 `data-suggest="false"` 可以关闭 Suggest 组件。</p>
        <input bx-name="components/taginput" data-suggest="false" class="form-control">
    </div>
</div>

<script>
    require(['brix/loader', 'underscore', 'mock'], function(Loader, _, Mock) {
        Loader.boot(function() {
            var data = Mock.mock({
                'list|5-10': ['@NAME', 'N@NATURAL']
            }).list
            var taginputs = Loader.query('components/taginput')
            _.each(taginputs, function(taginput, index) {
                taginput.on('change.suggest.input', function(event, value) {
                    if (!event.namespace) return
                    // if (!value) taginput.suggest.data([])
                    taginput.suggest.data(
                        _.difference(
                            _.filter(data, function(item, index) {
                                return ('' + item).indexOf(value) !== -1
                            })
                            , taginput.val()
                        )
                    )
                })
            })
        })
    })
</script>