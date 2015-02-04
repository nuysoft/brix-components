/* global define */
/*
    http://kimmobrunfeldt.github.io/progressbar.js/
 */
define(
    [
        'jquery', 'underscore', 'progressbar',
        'brix/base',
        'css!./progressbarwrapper.css'
    ],
    function(
        $, _, ProgressBar,
        Brix
    ) {

        function ProgressBarWrapper() {}

        _.extend(ProgressBarWrapper.prototype, Brix.prototype, {
            options: {
                TYPES: {
                    line: 'Line',
                    circle: 'Circle',
                    square: 'Square'
                },
                type: 'Line'
            },
            init: function() {
                this.options.type = this.options.TYPES[this.options.type.toLowerCase()]
            },
            render: function() {
                this.shape = new ProgressBar[this.options.type](this.element, this.options)
                if (this.options.progress) this.shape.animate(+this.options.progress)
            }
        })

        return ProgressBarWrapper
    }
)