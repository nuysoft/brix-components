### 示例 <small>Examples</small>

<style type="text/css">
    #options .dropdown,
    #options input {
        width: 120px;
        min-width: 120px;
        margin-left: 5px;
        margin-right: 10px;
        margin-bottom: 5px;
    }
    [bx-name="components/datepicker/ancient"] {
        margin-bottom: 10px;
    }
    [bx-name="components/datepicker/ancient"] code {
        display: inline-block;
        margin-bottom: 10px;
    }
</style>

<div id="options" class="mt20 mb10">
    <span>日期</span>
    <input name="date" on-change="build" placeholder="2016-08-01">
    <span>可选</span>
    <input name="range" on-change="build" placeholder="['+=0','+=90']">
    <span>禁选</span>
    <input name="excluded" on-change="build" placeholder="['+=0','+=90']">
    <br>
    <span>类型</span>
    <select bx-name="components/dropdown" name="type" on-change="build">
        <option value="">-</option>
        <option value="date">日期（默认）</option>
        <option value="year">年</option>
        <option value="month">月</option>
        <option value="day">日</option>
        <option value="time">时间</option>
        <option value="hour">时</option>
        <option value="minute">分</option>
        <option value="second">秒</option>
        <option value="date time">日期 + 时间</option>
    </select>
    <span>模式</span>
    <select bx-name="components/dropdown" name="mode" on-change="build">
        <option value="">-</option>
        <option value="single">单选（默认）</option>
        <option value="multiple">多选</option>
        <option value="range">范围</option>
    </select>
    <span>页数</span>
    <select bx-name="components/dropdown" name="pages" on-change="build">
        <option value="">-</option>
        <option value="1">1（默认）</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <br>
    <span>不限</span>
    <input name="unlimit" on-change="build" placeholder="2099-01-01">
</div>
<div id="playground"></div>
<pre class="mb10"><code id="shady" class="html"></code></pre>
<pre><code id="value"></code></pre>

<script type="text/javascript">
    // require(['css!dependencies/bootstrap/dist/css/bootstrap.min.css'])
    // require(['css!dependencies/brix-components/css-tool/components.css'])
    // require(['css!dependencies/brix-components/datepicker/ancient/datepicker.css'])
    // require(['css!dependencies/brix-components/css-tool/minecraft.css'])

    require(['brix/loader', 'brix/event', 'jquery'], function(Loader, EventManager, $) {
        function log(event, date, type){
            if(!event.namespace) return
            var group = [event.type, event.namespace, type, event.component.clientId].join(' ')
            date = _.isArray(date) ? date : [date]
            console.group(group)
            _.each(date, function(item, index) {
                console.log(index, item.format('YYYY-MM-DD HH:mm:ss.SSS'))
            })
            console.groupEnd(group)
        }

        var dpOptions = {}
        var owner = {
            handler: function(event){
                console.log(arguments)
            },
            build: function(event) {
                if(event) {
                    var select = event.currentTarget
                    dpOptions[select.name] = select.value    
                }

                var $datepicker = $('<div>').attr('bx-name', 'components/datepicker/ancient')
                for(var name in dpOptions) {
                    if (dpOptions[name]) $datepicker.attr('data-' + name, dpOptions[name])
                }

                var $playground = $('#playground')
                var $shady = $('#shady')

                Loader.destroy($playground)

                $playground.html($datepicker)
                $shady.text($datepicker[0].outerHTML)
                hljs.highlightBlock($shady[0])

                Loader.boot($playground, function(records){
                    var instance = records[0][1]
                    instance.on('change.datepicker unchange.datepicker', log)
                    instance.on('change.datepicker unchange.datepicker', function(event, date, type){
                        if(!event.namespace) debugger
                        var value = [
                            [event.type, event.namespace, type, event.component.clientId].join(' ')
                        ]
                        date = _.isArray(date) ? date : [date]
                        _.each(date, function(item, index) {
                            value.push(
                                ['  ', index, item.format('YYYY-MM-DD HH:mm:ss.SSS')].join(' ')
                            )
                        })
                        $('#value').text(value.join('\n'))
                    })

                    var date = instance.val()
                    var value = []
                    date = _.isArray(date) ? date : [date]
                    _.each(date, function(item, index) {
                        value.push(
                            [index, item.format('YYYY-MM-DD HH:mm:ss.SSS')].join(' ')
                        )
                        console.log()
                    })
                    $('#value').text(value.join('\n'))
                })
            }
        }
        owner.build()

        var manager = new EventManager('on-')
        manager.delegate(document.body, owner)

        Loader.boot(function() {
            var instances = Loader.query('components/datepicker/ancient')
            instances.on('change.datepicker unchange.datepicker', log)
        })
    })
</script>
