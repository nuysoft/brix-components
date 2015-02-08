/* global define, require, document */
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
        'brix/base', 'brix/event',
        '../areapicker/area.js',
        './tree.tpl.js',
        './tree.node.tpl.js',
        'css!./tree.css'
    ],
    function(
        $, _,
        Brix, EventManager,
        Area, // Area.tree(Area.REGION)
        template,
        nodeTemplate
    ) {

        var NAMESPACE = '.tree'

        function Tree() {}

        _.extend(Tree.prototype, Brix.prototype, {
            options: {
                data: undefined,
                nodeTemplate: undefined,
                state: 'expand' // expand, collapse
            },
            init: function() {
                var that = this
                var defer = $.Deferred()

                // 支持自定义 HTML 模板 template
                var deps = []
                var customNodeTemplate = this.options.nodeTemplate || this.options['node-template']
                if (customNodeTemplate) deps.push(customNodeTemplate)
                require(deps, function() {
                    if (customNodeTemplate) that.options.customNodeTemplate = arguments[0]
                    defer.resolve()
                })

                if (!this.options.data) {
                    // 解析数据时先移除 BiSheng 插入的 script 节点
                    $(this.element).find('script').remove()

                    var text = $.trim(this.element.innerHTML)
                        /* jshint evil:true */
                    this.options.data = eval(
                        '(function(){ return [].splice.call(arguments, 0 )[0] })(' + text + ')'
                    )
                    this.element.innerHTML = ''
                }

                var mapped = {}
                _.each(this.options.data, function(item /*, index*/ ) {
                    if (!item || !item.id) return

                    /*jshint eqnull:true */
                    if (item.pid != null && item.parentId == null) item.parentId = item.pid
                    if (item.pid == null && item.parentId != null) item.pid = item.parentId

                    mapped[item.id] = item
                })
                this.options.mapped = mapped

                this.options.data = {
                    id: 'root',
                    name: 'root',
                    children: Area.tree(this.options.data)
                }

                if (deps.length) return defer.promise()
            },
            render: function() {
                var that = this
                var manager = new EventManager()
                this.$element = $(this.element)

                fix(this.options.data, template, this.options.customNodeTemplate || nodeTemplate)
                this.$element.append(
                    _.template(template)(this.options.data)
                )

                manager.delegate(this.$element, this)

                if (this.options.state === 'collapse') this.collapse()
                if (this.options.state === 'expand') this.expand()

                /*
                    var Loader = require('brix/loader')
                    var trees = Loader.query('components/taginput')
                    trees.on('active.taginput inactive.taginput', function(e){ console.log(e.type, e.namespace, e.target) } )
                 */
                var type = 'click' + NAMESPACE + '_' + this.clientId
                this._state = 'inactive'
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (event.target === that.element || // 点击组件节点
                            $.contains(that.element, event.target) || // 点击组件子节点
                            !event.target.parentNode // 点击不存在节点
                        ) {
                            // if (that._state === 'active') return
                            that.trigger(
                                $.Event('active' + NAMESPACE, {
                                    target: event.target
                                })
                            )
                            that._state = 'active'
                            return
                        }

                        if (that._state === 'inactive') return
                        that.trigger(
                            $.Event('inactive' + NAMESPACE, {
                                target: event.target
                            })
                        )
                        that._state = 'inactive'
                    })
            },
            toggle: function(event, id) {
                var selector
                if (event === undefined) selector = 'li[data-node-id]' // toggle()
                else if (!event.type) selector = 'li[data-node-id="' + event + '"]' // toggle( id )
                else selector = 'li[data-node-id="' + id + '"]' // toggle( event, id )

                $(selector, this.$element)
                    .find('> .tree-node-control .brixfont').toggle().end()
                    .find('> ul.tree').slideToggle('fast')
            },
            expand: function(id) {
                var selector
                if (id === undefined) selector = 'li[data-node-id]'
                else selector = 'li[data-node-id="' + id + '"]'

                var mapped = this.options.mapped
                if (id !== undefined && mapped[id] && mapped[id].parentId) this.expand(mapped[id].parentId)

                $(selector, this.$element).show()
                    .find('> .tree-node-control .brixfont.plus-sign').hide().end()
                    .find('> .tree-node-control .brixfont.minus-sign').show().end()
                    .find('> ul.tree').slideDown('fast')
            },
            collapse: function(id) {
                var selector
                if (id === undefined) selector = 'li[data-node-id]'
                else selector = 'li[data-node-id="' + id + '"]'

                $(selector, this.$element).show()
                    .find('> .tree-node-control .brixfont.plus-sign').show().end()
                    .find('> .tree-node-control .brixfont.minus-sign').hide().end()
                    .find('> ul.tree').slideUp('fast')
            },
            search: function(value) {
                if (value === undefined) return

                var that = this
                $('li[data-node-id]', this.$element).hide()

                var matched = []
                _.each(this.options.mapped, function(item /*, id*/ ) {
                    if (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        matched.push(item)
                        clan(item, matched)
                    }
                })
                _.each(_.uniq(matched), function(item /*, index*/ ) {
                    that.expand(item.id)
                })

                highlight(this.$element, value)

                function clan(item, matched) {
                    _.each(item.children, function(stranger) {
                        matched.push(stranger)
                        clan(stranger, matched)
                    })
                }

                function highlight($container, value) {
                    var value_re = new RegExp(value, 'ig')
                    _.each($('.tree-node-content-name', $container), function(item /*, index*/ ) {
                        var $item = $(item)
                        $item.html(
                            $item.text().replace(value_re, function(matched) {
                                return '<span class="highlight">' + matched + '</span>'
                            })
                        )
                    })
                }

            },
            forward: function(event, id) {
                this.trigger(event.type + NAMESPACE, [this.options.mapped[id], event.currentTarget])
            }
        })

        function fix(node, template, nodeTemplate) {
            node.contentFn = function(item) {
                return item.content || _.template(nodeTemplate)(item)
            }
            node.childrenFn = function() {
                if (!this.children || !this.children.length) return ''
                return _.template(template)(this)
            }
            _.each(node.children, function(item /*, index*/ ) {
                fix(item, template, nodeTemplate)
            })
        }

        return Tree
    }
)