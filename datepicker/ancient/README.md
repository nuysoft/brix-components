# DatePicker

日期选择器。{ .lead }

> 依赖 <http://momentjs.com/>。

### 示例 <small>Examples</small>

<div bx-name="components/datepicker/ancient" data-type="date time" data-unlimit="2099-1-1" data-pages="3" data-range="['2016-05-10', '2016-06-10']" bx-ready="alert(1)"></div>
<div bx-name="components/datepicker/ancient" data-type="date time" data-unlimit="2099-1-1" data-pages="2" bx-ready="alert(1)"></div>
<div bx-name="components/datepicker/ancient" data-type="date time" data-pages="3"></div>
<div bx-name="components/datepicker/ancient" data-type="date time" data-pages="4" bx-ready="alert(1)"></div>

<div bx-name="components/datepicker/ancient" data-type="time"></div>

<script type="text/javascript">
    require(['css!dependencies/bootstrap/dist/css/bootstrap.min.css'])
    // require(['css!dependencies/brix-components/css-tool/components.css'])
    require(['css!dependencies/brix-components/datepicker/ancient/datepicker.css'])
    require(['css!dependencies/brix-components/css-tool/minecraft.css'])

    require(['brix/loader', 'brix/event'], function(Loader, EventManager) {
        Loader.boot(function() {
            var instances = Loader.query('components/datepicker/ancient')
            instances.on('change.datepicker unchange.datepicker', function(event, date, type) {
                console.log(
                    event.type,
                    event.namespace,
                    type, 
                    date.format('YYYY-MM-DD HH:mm:ss.SSS')
                )
            })
        })
    })
</script>
