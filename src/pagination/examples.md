<script type="text/javascript">
    require(['brix/loader'], function(Loader){
        Loader.boot(function(){
            Loader.query('components/pagination')
                .on('change.pagination', function(event, state) {
                    console.log(event, state)
                })
        })
    })
</script>

## 示例

<div class="bs-example">
    <div class="content">
        <div bx-name="components/pagination" data-total="100" data-cursor="1" data-limit="9"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="2" data-limit="10"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="3" data-limit="11"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="4" data-limit="12" data-limits="[9, 10, 8, 7, 40, 30, 20]"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="5" data-limit="13" data-limits="[40, 30, 20]"></div>
        <div bx-name="components/pagination" data-total="100" data-cursor="6" data-limit="14" data-limits="[40, 30, 20]" data-simplify="true"></div>
    </div>
</div>
