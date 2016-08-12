## 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <a href="javascript:;" bx-name="components/errortips" bx-options="{duration:2000,width:200}" mx-click="confirm" class="btn btn-primary">Submit</a>
        <a href="javascript:;" bx-name="components/errortips" bx-options="{duration:2000,width:200}" mx-click="confirm" class="btn btn-primary">Submit</a>
        <a href="javascript:;" bx-name="components/errortips" bx-options="{duration:2000,width:200}" mx-click="confirm" class="btn btn-primary">Submit</a>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader', 'brix/event'], function(Loader, EventManager) {
        var manager = new EventManager('mx-')
        var owner = {
            confirm: function(event){
                var instance = Loader.query(event.currentTarget)[0]
                instance.showTips(Math.random())
            }
        }
        manager.delegate($('.bs-example'), owner)
    })
</script>

