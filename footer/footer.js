/* global define */
define(
    [
        'jquery', 'underscore',
        'base/brix',
        './footer.tpl.js',
        'css!./footer.css'
    ],
    function(
        $, _,
        Brix,
        template
    ) {
        /*
            页脚组件
        */
        function Footer() {}

        _.extend(Footer.prototype, Brix.prototype, {
            options: {},
            render: function() {
                $(this.element).append(template)
            }
        })
        
        return Footer
    }
)