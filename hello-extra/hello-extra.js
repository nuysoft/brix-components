/* global define */
define(
    [
        'jquery', 'underscore',
        'components/hello',
        'text!./hello-extra.tpl',
        'css!./hello-extra.css'
    ],
    function(
        $, _,
        Hello,
        template
    ) {
        return Hello.extend({
            render: function() {
                var html = _.template(template, this.options)
                $(this.element).append(html)
            }
        })
    }
)