/* global define */
define(
    [
        'jquery', 'underscore',
        'brix/base'
    ],
    function(
        $, _,
        Brix
    ) {
        function Footer() {}

        _.extend(Footer.prototype, Brix.prototype, {
            options: {
                type: 'front' // back
            },
            init: function() {
                // $(this.element).append('<hr class="footer-top-border">')
            },
            render: function() {
                // http://www.taobao.com/go/rgn/mm/footer.php?callback=jsonp189
                var that = this
                var mode = this.options.type === 'front' ? '' : 'simple'
                $.ajax({
                    url: 'http://www.taobao.com/go/rgn/mm/footer.php',
                    data: {
                        mode: mode
                    },
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function(resp /*, status, xhr*/ ) {
                        $(that.element).append(
                            $('<textarea />').html(resp).val()
                            .replace(
                                '<style type="text/css">',
                                '<style type="text/css" scoped>'
                            )
                        )
                    }
                })
            }
        })

        return Footer
    }
)