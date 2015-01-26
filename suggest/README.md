# Suggest

提示补全组件。{ .lead }

<div class="bs-example">
    <div class="content">
        <input bx-name="components/suggest" class="form-control">
    </div>
</div>

<!-- <div class="bs-example">
    <div class="content">
        <h4>自动在组件原始节点上触发 change 事件。</h4>
        <input bx-name="components/suggest" class="form-control" onchange="alert(this.value)">
    </div>
</div> -->

<!-- > Suggest 组件会触发两个 `change` 事件：`change.suggest.done` 和 `change`，前者带有命名空间，后者没有。可以通过检测命名空间来区分。 -->

<script>
    require(['brix/loader', 'mock'], function(Loader, Mock) {
        Mock.Random.extend({
            hanzi: function(min, max) {
                var len
                var result = []

                if (arguments.length === 0) len = this.natural(3, 7)
                if (arguments.length === 1) len = max = min
                if (arguments.length === 2) {
                    min = parseInt(min, 10)
                    max = parseInt(max, 10)
                    len = this.natural(min, max)
                }

                for (var i = 0; i < len; i++) {
                    result.push(
                        /* jshint -W061 */
                        eval(
                            '"\\u' +
                            (Math.round(Math.random() * 20901) + 19968).toString(16) +
                            '"'
                        )
                    )
                }

                return result.join('')
            }
        })
        Loader.boot(function() {
            var data = Mock.mock({
                'list|5-10': ['@NAME', '@NATURAL(1,1000000)', '@HANZI']
            }).list

            var suggest = Loader.query('components/suggest')
            suggest.on('change.suggest.input', function(event, value) {
                suggest.data(
                    _.filter(data, function(item, index){
                        return ('' + item).toLowerCase().indexOf(value.toLowerCase()) !== -1
                    })
                )
            })
        })
    })
</script>