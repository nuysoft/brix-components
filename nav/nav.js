/* global define, window */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'brix/base'
    ],
    function(
        $, _,
        Loader, Brix
    ) {
        /*
            导航栏。        
    
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
            options: {
                'selector': ''
            },
            render: function() {
                var that = this
                var $element = $(this.element)
                Loader.boot(function() {
                    var h1s = $(that.options.selector)
                    var anchors = $()
                    init($element, h1s, anchors)
                    $(window).on('scroll',
                        // http://underscorejs.org/#throttle
                        _.throttle(function( /*event*/ ) {
                            scroller(h1s, anchors)
                        }, 10)
                    )
                })
            }
        })

        function init($element, h1s, anchors) {
            _.each(h1s, function(h1, index) {
                var name = $(h1).text()
                $(''.anchor(name)).insertBefore(h1)
                var className = (!window.location.hash && index === 0 ||
                    window.location.hash.slice(1) === name) ? 'active' : ''
                var anchor = $(name.link('#' + name))
                anchor
                    .addClass('list-group-item')
                    .addClass(className)
                    .appendTo($element)
                    .on('click', function() {
                        $(this).addClass('active')
                            .siblings().removeClass('active')
                    })
                anchors.push(anchor[0])
            })
        }

        function scroller(h1s, anchors) {
            var $window = $(window)
            var base = $window.scrollTop() + $window.height() / 2
            var minDistance, minIndex
            _.each(h1s, function(h1, index) {
                h1 = $(h1)
                var start = h1.offset().top
                var end = start + h1.outerHeight()
                var distance
                if (start <= base && end >= base) distance = 0
                else {
                    if (start > base) distance = start - base
                    if (end < base) distance = base - end
                }
                if (index === 0 || distance < minDistance) {
                    minDistance = distance
                    minIndex = index
                }
            })
            anchors.eq(minIndex)
                .addClass('active')
                .siblings().removeClass('active')
        }

    }
)