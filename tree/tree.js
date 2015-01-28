/* global define, require */
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
        './tree.node.tpl.js',
        'css!./tree.css'
    ],
    function(
        $, _,
        Brix,
        Area, // Area.tree(Area.REGION)
        template,
        nodeTemplate
    ) {

        function Tree() {}

        _.extend(Tree.prototype, Brix.prototype, {
            options: {},
            init: function() {
                var defer = $.Deferred()

                // 支持自定义 HTML 模板 template
                var deps = []
                var customNodeTemplate = this.options.template
                if (customNodeTemplate) deps.push(customNodeTemplate)
                require(deps, function() {
                    if (customNodeTemplate) nodeTemplate = arguments[0]
                    defer.resolve()
                })

                if (!this.options.data) {
                    var text = $.trim(this.element.innerHTML)
                        /* jshint evil:true */
                    this.options.data = eval(
                        '(function(){ return [].splice.call(arguments, 0 )[0] })(' + text + ')'
                    )
                    this.element.innerHTML = ''
                }

                this.options.data = {
                    id: 'root',
                    name: 'root',
                    children: Area.tree(this.options.data || Area.REGION)
                }

                if (deps.length) return defer.promise()
            },
            render: function() {
                this.$element = $(this.element)
                fix(this.options.data, template)
                this.$element.append(
                    _.template(template)(this.options.data)
                )

                this.$element
                    .on('click', '.tree-node-toggle', function(event) {
                        $(event.currentTarget)
                            .find('.brixfont')
                            .toggle()
                        $(event.currentTarget)
                            .closest('li.tree-node')
                            .find('ul.tree')
                            .slideToggle('fast')
                    })
                    .on('dblclick', '.tree-node-content', function(event) {
                        $(event.currentTarget).prev()
                            .find('.brixfont')
                            .toggle()
                        $(event.currentTarget)
                            .closest('li.tree-node')
                            .find('ul.tree')
                            .slideToggle('fast')
                    })
            }
        })

        function fix(node, template) {
            node.contentFn = function(item) {
                return item.content || _.template(nodeTemplate)(item)
            }
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