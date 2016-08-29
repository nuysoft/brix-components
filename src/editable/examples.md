<!-- Editable enables user click element to edit it. -->

## 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <h3 bx-name="components/editable">This is a editable title.</h3>
        <p bx-name="components/editable">This is a editable paragraph. This is a editable paragraph. This is a editable paragraph. This is a editable paragraph. This is a editable paragraph. This is a editable paragraph.</p>
        <pre bx-name="components/editable">This is a editable predefined.</pre>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <p bx-name="components/editable" data-type="html"><kbd>This is a editable keyboard input element.</kbd> cool!</p>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <span bx-name="components/editable" data-content="A editable span with content from data-*."></span>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        Hello <span bx-name="components/editable">Editable</span>!
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <h3>自定义模式</h3>
        <div bx-name="components/editable">
            <div class="editable-content">自定义模式</div>
            <div class="editable-toggle">?</div>
            <input class="editable-input">
        </div>
    </div>
</div>

<script>
    var Loader = require('brix/loader')
    Loader.boot(function() {
        var editables = Loader.query('components/editable')
        editables.on('change.editable', function(event, extra) {
            // if (event.namespace !== 'editable') return
            if(extra.length < 3) {
                console.warn('太短了，最少 3 个字符！')
                event.preventDefault()
            }
            console.log(event.type, event.namespace, extra)
        })
    })
</script>

