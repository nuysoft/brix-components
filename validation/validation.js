/* global define, require, window */
/*
    http://parsleyjs.org/
    Parsley, the ultimate JavaScript form validation library
    Validating forms frontend have never been so powerful and easy.
 */
define(
    [
        'jquery', 'underscore', 'parsley',
        'brix/base'
    ],
    function(
        $, _, Parsley,
        Brix
    ) {

        function Validation() {}

        _.extend(Validation.prototype, Brix.prototype, {
            options: {
                i18n: 'zh_cn'
            },
            init: function() {
                if (!Parsley) Parsley = window.Parsley
                require(['dependencies/parsleyjs/src/i18n/' + this.options.i18n])
            },
            render: function() {
                this.parsley = $(this.element).parsley()
                // this.parsley = new Parsley(this.element)
            },
            validate: function(group, force) {
                this.parsley.validate(group, force)
                return this
            },
            isValid: function(group, force) {
                return this.parsley.isValid(group, force)
            },
            reset: function() {
                this.parsley.reset()
                return this
            },
            destroy: function() {
                this.parsley.destroy()
                return this
            }
        })

        return Validation
    }
)