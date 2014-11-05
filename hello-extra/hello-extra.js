/* global define */
define(
    [
        'jquery', 'underscore',
        'components/hello',
        './hello-extra.tpl.js',
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