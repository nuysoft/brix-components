/* global define */
/* jshint multistr:true */
/*
    Router
        https://github.com/visionmedia/page.js
        https://github.com/flatiron/director
    URI
        https://github.com/medialize/URI.js
 */
define(
    [
        'jquery', 'underscore', 'director',
        'loader', 'base/brix',
        'text!./spa.tpl',
        'less!./spa.less'
    ],
    function(
        $, _, Router,
        Loader, Brix,
        template
    ) {
        /*
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
            // TODO
            options: {
                // SPA 容器节点
                container: '#container',
                // 框架页
                frame: 'app/frame',
                // 默认 View 关联的元素
                target: '.main',
                // 默认 View
                view: 'app/main'
            },
            render: function() {
                $(this.element).append(template)
                this.start()
            },
            start: function() {
                var that = this
                var router = new Router()
                router.on(/!?([^?]*)\??(.*)?/, handle)
                router.init()
                if (!location.hash) handle(this.options.view)
                return this

                function handle(moduleId, params) {
                    console.log(moduleId, params)
                    Loader.load(
                        $(that.options.target),
                        moduleId,
                        Loader.Util.unparam(params)
                    )
                }

            }
        })
    }
)

define('app/frame', ['base/brix'], function(Brix) {
    return Brix.extend({
        render: function() {
            var template = '<div class="row">\
                                <div class="col-xs-4" bx-name="app/sidebar"></div>\
                                <div class="col-xs-8" bx-name="app/main"></div>\
                            </div>'
            $(this.element).append(template)
        }
    })
})
define('app/sidebar', ['base/brix'], function(Brix) {
    return Brix.extend({
        render: function() {
            var template = '<ul>\
                                <li><a href="#components/hello?message=SPA">hello</a></li>\
                                <li><a href="#components/spin?type=three-bounce">spin</a></li>\
                            </ul>'
            $(this.element).append(template)
        }
    })
})
define('app/main', ['base/brix'], function(Brix) {
    return Brix.extend({
        render: function() {
            var template = '点击左侧的链接。'
            $(this.element).append(template)
        }
    })
})