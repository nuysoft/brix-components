/* global define */
/*
    var Loader = require('brix/loader')
    var tree = Loader.query('components/ctree')
    tree[0]._renderTree()
 */
define(
    [
        'jquery', 'underscore',
        'brix/loader', 'brix/base',
        './ctree.tpl.js',
        'css!./ctree.css'
    ],
    function(
        $, _,
        Loader, Brix,
        template
    ) {
        /*
            ### 数据
                {}
            ### 选项
                data template
            ### 属性
                element moduleId clientId parentClientId childClientIds data template
            ### 方法
                .render()
            ### 事件
                ready destroyed
        */
        function Tree() {}

        _.extend(Tree.prototype, Brix.prototype, {
            options: {},
            render: function() {
                var that = this
                Loader.boot(function() {
                    that._renderTree()
                })
            },
            _renderTree: function() {
                var $element = $(this.element).empty()
                var root = Loader.tree()
                fix(root, template)
                $element.append(
                    // _.template 如果递归？
                    _.template(template)(root)
                )
            }
        })

        function fix(node, template) {
            node.childrenFn = function() {
                if (!this.children || !this.children.length) return ''
                return _.template(template)(this)
            }
            _.each(node.children, function(item /*, index*/ ) {
                fix(item, template)
            })
        }

        return Tree
    }
)