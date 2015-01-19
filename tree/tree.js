/* global define */
/*
    Tree
    * Node
        * id
        * pid
        * name
        * title
        * url
        * children
 */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        '../areapicker/area.js',
        './tree.tpl.js',
        'css!./tree.css'
    ],
    function(
        $, _,
        Brix,
        Area, // Area.tree(Area.REGION)
        template
    ) {

        function Tree() {}

        var data = [
            { id: '一', name: '一' },
            { id: '二', name: '二' },
            { id: '三', name: '三' },

            { id: '一一', pid: '一', name: '一一' },
            { id: '一二', pid: '一', name: '一二' },

            { id: '二一', pid: '二', name: '二一' },
            { id: '二二', pid: '二', name: '二二' },

            { id: '三一', pid: '三', name: '三一' },
            { id: '三二', pid: '三', name: '三二' },

            { id: '一一一', pid: '一一', name: '一一一' },
            { id: '一一二', pid: '一一', name: '一一二' },
            { id: '一一三', pid: '一一', name: '一一三' },

            { id: '一一一一', pid: '一一一', name: '一一一一' },
        ]

        _.extend(Tree.prototype, Brix.prototype, {
            options: {},
            init: function() {},
            render: function() {
                this.$element = $(this.element)
                this.data = {
                    children: Area.tree(data) // REGION
                }
                fix(this.data, template)
                this.$element.append(
                    _.template(template)(this.data)
                )

                this.$element.on('click', '.tree-toggle', function(event) {
                    $(event.currentTarget)
                        .find('.glyphicon')
                        .toggleClass('glyphicon-plus-sign')
                        .toggleClass('glyphicon-minus-sign')
                    $(event.currentTarget)
                        .closest('li.node')
                        .find('ul.tree')
                        .slideToggle('fast')
                })
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