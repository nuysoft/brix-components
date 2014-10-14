/* global define, window */
define(
    [
        'jquery', 'underscore',
        'loader', 'base/brix'
    ],
    function(
        $, _,
        Loader, Brix
    ) {
        /*
            置顶效果。        
    
            ### 数据
                {}
            ### 选项
                TODO
            ### 属性
                TODO
            ### 方法
                TODO
            ### 事件
                TODO
            ===

            ### 公共选项
                data template css
            ### 公共属性
                element relatedElement 
                moduleId clientId parentClientId childClientIds 
                data template css
            ### 公共方法
                .render()
            ### 公共事件
                ready destroyed

        */

        return Brix.extend({
            options: {},
            render: function() {
                var $element = $(this.element)
                Loader.boot(function() {
                    var offset = $element.offset()
                    $(window).on('scroll',
                        // http://underscorejs.org/#throttle
                        _.throttle(function( /*event*/ ) {
                            var scrollTop = $(window).scrollTop()
                            if (scrollTop > offset.top) {
                                $element.offset({
                                    top: scrollTop
                                })
                            } else {
                                $element.offset({
                                    top: offset.top
                                })
                            }
                        }, 10)
                    )
                })
            }
        })

    }
)