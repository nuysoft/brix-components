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
        'css!components/bower_components/parsleyjs/src/parsley.css'
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
                require(['components/validation/i18n/' + this.options.i18n])
            },
            render: function() {
                this.parsley = new Parsley(this.element)
            }
        })
    }
)