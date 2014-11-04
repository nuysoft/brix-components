/* global define, require */
/*
    http://ricostacruz.com/nprogress/
 */
define(
    [
        'base/brix', 'nprogress',
        'css!components/bower_components/nprogress/nprogress.css'
    ],
    function(
        Brix,
        NProgress
    ) {
        return Brix.extend({
            options: {},
            init: function() {
                require(['css!./components/nprogress.css'])
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