<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="//g.alicdn.com/thx/brix-release/require-config-css.js"></script>
<style type="text/css">
    body {
        padding: 5px 0;
    }
</style>
<div class="bs-example">
    <div class="content">
        <form>
            <div class="row">
                <div class="col-xs-6">
                    <h4>可用状态</h4>
                    <input type="checkbox" bx-name="components/switch">
                    <input type="checkbox" bx-name="components/switch" checked>
                </div>
                <div class="col-xs-6">
                    <h4>禁用状态</h4>
                    <input type="checkbox" bx-name="components/switch" disabled>
                    <input type="checkbox" bx-name="components/switch" disabled checked>
                </div>
            </div>
        </form>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <form>
            <div class="row">
                <div class="col-xs-6">
                    <h4>设置 name、value</h4>
                    <input type="checkbox" bx-name="components/switch" name="foo" value="foo">
                    <input type="checkbox" bx-name="components/switch" name="bar" value="bar" checked>
                </div>
                <div class="col-xs-6">
                    <h4>设置 name、value</h4>
                    <input type="checkbox" bx-name="components/switch" name="foo" value="foo" disabled>
                    <input type="checkbox" bx-name="components/switch" name="bar" value="bar" disabled checked>
                </div>
            </div>
        </form>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <form>
            <div class="row">
                <div class="col-xs-6">
                    <h4><code>data-size="small"</code></h4>
                    <input type="checkbox" bx-name="components/switch" data-size="small">
                    <input type="checkbox" bx-name="components/switch" data-size="small" checked>
                </div>
                <div class="col-xs-6">
                    <h4><code>data-size="large"</code></h4>
                    <input type="checkbox" bx-name="components/switch" data-size="large" disabled>
                    <input type="checkbox" bx-name="components/switch" data-size="large" disabled checked>
                </div>
            </div>
        </form>
    </div>
</div>
<script type="text/javascript">
    require(['brix/loader'], function(Loader) {
        Loader.boot(function() {
            var instances = Loader.query('components/switch')
            instances.on('change.switch', function(event, extra) {
                // event.preventDefault()
                console.log(event.type, event.namespace, extra)
            })
        })
    })
</script>
