/* global define */
/*
    http://ricostacruz.com/nprogress/
 */
define(
    [
        'brix/base', 'nprogress'
    ],
    function(
        Brix, NProgress
    ) {
        return Brix.extend({
            options: {},
            init: function() {
                window.require(['css!./nprogress.css'])
                this.NProgress = NProgress
            },
            render: function() {
                NProgress.start()
            },
            start: function() {
                NProgress.start()
            },
            done: function() {
                NProgress.done()
            },
            set: function(n) {
                NProgress.set(n)
            },
            inc: function() {
                NProgress.inc()
            }
        })
    }
)