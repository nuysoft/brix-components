# TagInput

<input bx-name="components/taginput" class="form-control">

<script>
    require(['brix/loader', 'underscore', 'mock'], function(Loader, _, Mock) {
        Loader.boot(function() {
            var taginput = Loader.query('components/taginput')[0]
            var data = Mock.mock({
                'list|5-10': ['@NAME', '@NATURAL']
            }).list
            taginput.on('change.suggest.input', function(event, value) {
                console.log(event.namespace, value, event.timeStamp)
                if (!event.namespace) return
                // if (!value) taginput.suggest.data([])

                taginput.suggest.data(
                    _.filter(data, function(item, index){
                        return ('' + item).indexOf(value) !== -1
                    })
                )
            })
        })
    })
</script>