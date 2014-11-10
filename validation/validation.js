/* global define, require, window */
/*
    http://parsleyjs.org/
    Parsley, the ultimate JavaScript form validation library
    Validating forms frontend have never been so powerful and easy.
 */
define(
    [
        'parsley',
        'base/brix',
        'css!dependencies/parsleyjs/src/parsley.css',
        'css!./validation.css'
    ],
    function(
        Parsley,
        Brix

    ) {
        return Brix.extend({
            options: {
                i18n: 'zh_cn'
            },
            init: function() {
                if (!Parsley) Parsley = window.Parsley
                require(['dependencies/parsleyjs/src/i18n/' + this.options.i18n])
            },
            render: function() {
                this.parsley = new Parsley(this.element)
            },
            validate: function() {
                this.parsley.validate()
                return this
            },
            isValid: function() {
                return this.parsley.isValid()
            }
        })
    }
)