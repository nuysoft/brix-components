# DatePicker

日期选择器。{ .lead }

> 依赖 <http://momentjs.com/>。

### 示例 <small>Examples</small>

<div bx-name="components/datepicker/ancient" 
    data-date="[new Date()][0]" 
    data-type="date time" 
    data-unlimit="2099-1-1" 
    data-pages="3" 
    data-range="[['+=0', '+=30']]" 
    data-excluded="[['+=2', '+=4']]"
    on-change="handler"></div>
<div bx-name="components/datepicker/ancient" data-type="date time" data-unlimit="2099-1-1" data-pages="2" bx-ready="alert(1)"></div>
<div bx-name="components/datepicker/ancient" data-type="date time" data-pages="3"></div>
<div bx-name="components/datepicker/ancient" data-type="date time" data-pages="4" bx-ready="alert(1)"></div>


    data-range="[['+=0', '+=6'], ['+=14', '+=20'], ['+=28', '+=34'], ['+=42', '+=48'], ['+=180', '+=3650']]" 
    data-excluded="[['+=2', '+=4']]"

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
                if(!event.namespace) return
                console.log(
                    event.type,
                    event.namespace,
                    type, 
                    date.format('YYYY-MM-DD HH:mm:ss.SSS')
                )
            })
            var owner = {
                handler: function(event){
                    console.log(arguments)
                }
            }
            var manager = new EventManager('on-')
            manager.delegate(document.body, owner)
        })
    })
</script>
