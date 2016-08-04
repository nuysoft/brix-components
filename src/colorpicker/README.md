# ColorPicker

调色板。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/colorpicker" bx-click="toggle" class="btn btn-default">ColorPicker</div>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader'], function(Loader) {
        Loader.boot(function() {
            var instances = Loader.query('components/colorpicker')
            instances.on('change.colorpicker', function(event, extra) {
                console.log(
                    event.type,
                    event.namespace,
                    extra
                )
            })
        })
    })
</script>