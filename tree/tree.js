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
        var STATE = {
            PENDING: 'pending',
            ACTIVE: 'active',
            INACTIVE: 'inactive'
        }

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
                this._state = STATE.INACTIVE
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (event.target === that.element || // 点击组件节点
                            $.contains(that.element, event.target) || // 点击组件子节点
                            !event.target.parentNode // 点击不存在节点
                        ) {
                            if (that._state === STATE.ACTIVE) return
                            that.trigger(
                                $.Event('active' + NAMESPACE, {
                                    target: event.target
                                })
                            )
                            that._state = STATE.ACTIVE
                            return
                        }

                        if (that._state === STATE.INACTIVE) return
                        that.trigger(
                            $.Event('inactive' + NAMESPACE, {
                                target: event.target
                            })
                        )
                        that._state = STATE.INACTIVE
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

                // 先展开父节点和祖先节点
                var mapped = this.options.mapped
                if (id !== undefined && mapped[id] && mapped[id].parentId) this.expand(mapped[id].parentId)

                // 再展开当前节点
                var liNode = $(selector, this.$element).show()
                    .find('> .tree-node-control .brixfont.plus-sign').hide().end()
                    .find('> .tree-node-control .brixfont.minus-sign').show().end()
                if (id === undefined) liNode.find('> ul.tree').show()
                else liNode.find('> ul.tree').slideDown('fast')
            },
            collapse: function(id) {
                var selector
                if (id === undefined) selector = 'li[data-node-id]'
                else selector = 'li[data-node-id="' + id + '"]'

                var liNode = $(selector, this.$element).show()
                    .find('> .tree-node-control .brixfont.plus-sign').show().end()
                    .find('> .tree-node-control .brixfont.minus-sign').hide().end()
                if (id === undefined) liNode.find('> ul.tree').hide()
                else liNode.find('> ul.tree').slideUp('fast')
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
            current: function(element) {
                if (!element) return

                var mapped = this.options.mapped
                var result = {}

                // .current( jQuery ) .current( element ) .current( id )
                var id = element.jquery ? element.attr('data-node-id') :
                    element.nodeType ? $(element).attr('data-node-id') :
                    element
                var selector

                if (!id || !mapped[id]) return

                selector = 'li[data-node-id="' + id + '"]'
                result.data = mapped[id]
                result.element = $(selector, this.$element).find('> .tree-node-control > .tree-node-content')[0]

                return result
            },
            parent: function(element) {
                if (!element) return

                var mapped = this.options.mapped
                var result = {}

                // .parent( jQuery ) .parent( element ) .parent( id )
                var id = element.jquery ? element.attr('data-node-id') :
                    element.nodeType ? $(element).attr('data-node-id') :
                    element
                var parentId, selector

                if (!id ||
                    !mapped[id] ||
                    !mapped[id].parentId ||
                    !mapped[mapped[id].parentId]
                ) return

                parentId = mapped[id].parentId
                selector = 'li[data-node-id="' + parentId + '"]'
                result.data = mapped[parentId]
                result.element = $(selector, this.$element).find('> .tree-node-control > .tree-node-content')[0]

                return result
            },
            children: function(element) {
                if (!element) return

                var that = this
                var mapped = this.options.mapped
                var result = []

                // .children( jQuery ) .children( element ) .children( id )
                var id = element.jquery ? element.attr('data-node-id') :
                    element.nodeType ? $(element).attr('data-node-id') :
                    element
                var selector

                if (!id ||
                    !mapped[id] ||
                    !mapped[id].children ||
                    !mapped[id].children.length
                ) return result

                _.each(mapped[id].children, function(item /*, index*/ ) {
                    selector = 'li[data-node-id="' + item.id + '"]'
                    result.push({
                        data: mapped[item.id],
                        element: $(selector, that.$element).find('> .tree-node-control > .tree-node-content')[0]
                    })
                })

                return result
            },
            siblings: function(element) {
                if (!element) return

                var that = this
                var mapped = this.options.mapped

                // .siblings( jQuery ) .siblings( element ) .siblings( id )
                var id = element.jquery ? element.attr('data-node-id') :
                    element.nodeType ? $(element).attr('data-node-id') :
                    element

                var parent = this.parent(element)
                var children = []

                // 当前节点不是根节点
                if (parent) {
                    children = this.children(parent.element)

                } else {
                    // 当前节点是根节点
                    if (!id || !mapped[id]) return []
                    var parentId = mapped[id].parentId
                    var selector
                    _.each(mapped, function(item /*, index*/ ) {
                        if (item.parentId !== parentId) return

                        selector = 'li[data-node-id="' + item.id + '"]'
                        children.push({
                            data: item,
                            element: $(selector, that.$element).find('> .tree-node-control > .tree-node-content')[0]
                        })
                    })
                }

                var result = []
                _.each(children, function(item /*, index*/ ) {
                    if (item.data.id !== id) result.push(item)
                })

                return result
            },
            all: function() {
                var that = this
                var mapped = this.options.mapped
                var result = []
                var selector

                _.each(mapped, function(item /*, index*/ ) {
                    selector = 'li[data-node-id="' + item.id + '"]'
                    result.push({
                        data: mapped[item.id],
                        element: $(selector, that.$element).find('> .tree-node-control > .tree-node-content')[0]
                    })
                })

                return result
            },
            forward: function(event, id) {
                var forwardEvent = $.Event(event.type + NAMESPACE, {
                    target: event.target,
                    currentTarget: event.currentTarget
                })
                this.trigger(forwardEvent, [this.options.mapped[id], event.currentTarget])
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