/* global define, require */
/*
    http://parsleyjs.org/
    Parsley, the ultimate JavaScript form validation library
    Validating forms frontend have never been so powerful and easy.
 */
define(
    [
        'jquery', 'underscore', 'parsley',
        'base/brix',
        'css!components/bower_components/parsleyjs/src/parsley.css'
    ],
    function(
        $, _, Parsley,
        Brix

    ) {
        return Brix.extend({
            options: {
                i18n: 'zh_cn'
            },
            init: function() {
                require(['components/validation/i18n/' + this.options.i18n])
            },
            render: function() {
                this.parsley = new window.Parsley(this.element)
            }
        })
    }
)