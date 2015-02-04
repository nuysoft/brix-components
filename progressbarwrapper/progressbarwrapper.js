/* global define */
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
            init: function() {},
            render: function() {
                var type = this.options.TYPES[this.options.type.toLowerCase()]
                var shape = new ProgressBar[type](this.element, this.options)
                if (this.options.progress) shape.animate(+this.options.progress)
                
                this.shape = shape
            }
        })

        return ProgressBarWrapper
    }
)