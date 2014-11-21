# Dialog

对话框。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example bs-example-modal">
    <div class="content">
        <div bx-name="components/dialog" bx-click="show" data-placement="bottom" data-align="left" data-content="hello" class="btn btn-default">Dialog</div>
    </div>
</div>
<div class="bs-example bs-example-modal">
    <div class="content">
        <input id="inputTrigger" bx-name="components/dialog" bx-focus="show" bx-blur="hide" data-content="hello" data-placement="right" data-align="top" data-closable="false" data-offset="{ top: -10, left: 5 }" data-width="400" type="text" class="form-control w200">
    </div>
</div>
<div class="bs-example bs-example-modal">
    <div class="content">
        <input id="inputTrigger" bx-name="components/dialog" bx-focus="show" bx-blur="hide" bx-options="{
            content: '\
                <h4>Title</h4><hr>\
                <div>Content</div><hr>\
                <p>Close</p>\
            ',
            placement: 'right',
            align: 'top',
            closable: false,
            offset: {
                top: -10, 
                left: 5
            },
            width: 400
        }" type="text" class="form-control w200">
    </div>
</div>
<div class="bs-example bs-example-modal">
    <div class="content">
        <div bx-name="components/dialog" bx-click="show" data-placement="bottom" data-align="left" data-width="300" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">placement bottom + align left</div>
        <div bx-name="components/dialog" bx-click="show" data-placement="bottom" data-align="right" data-width="300" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">placement bottom + align right</div>
    </div>
</div>
<div class="bs-example bs-example-modal">
    <div class="content">
        <div bx-name="components/dialog" bx-click="show" data-placement="right" data-align="top" data-width="300" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">placement right + align top</div>
        <div bx-name="components/dialog" bx-click="show" data-placement="right" data-align="bottom" data-width="300" data-content="Bad men live so that they may eat and drink, whereas good men eat and drink so that they may live." class="btn btn-default">placement right + align bottom</div>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader', 'log'], function(Loader, log) {
        Loader.boot(function() {
            var instances = Loader.query('components/dialog')
            instances.on('show.dialog hide.dialog', function(event) {
                log(
                    '_' + event.type + '_ ' + 
                    '*' + event.namespace + '* '
                )
            })
            var $inputTrigger = Loader.query($('#inputTrigger'))[0]
            $inputTrigger.on('show.dialog', function(event) {
                var $content = $inputTrigger.$relatedElement.find('.content')
                Loader.load($content, 'components/spin')
            })
        })
    })
</script>
