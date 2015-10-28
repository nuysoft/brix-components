/* global define, setTimeout */
define(
    [
        'jquery', 'underscore',
        'brix/base'
    ],
    function(
        $, _,
        Brix
    ) {
        function Tab() {}

        _.extend(Tab.prototype, Brix.prototype, {
            options: {
                event: 'click',
                delay: 0
            },
            init: function() {},
            render: function() {
                var that = this
                this.$element = $(this.element)
                this.$element.on(this.options.event, 'li', function(event) {
                    setTimeout(function() {
                        var contents = $(event.delegateTarget).attr('data-content')
                        if (contents) {
                            $(contents).children().hide()
                                .eq(
                                    $(event.currentTarget).index()
                                )
                                .removeClass('hide')
                                .show()
                        }
                        $(event.currentTarget).addClass('active')
                            .siblings().removeClass('active')
                    }, that.options.dalay)
                })
            }
        })

        return Tab
    }
)