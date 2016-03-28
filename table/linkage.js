/* global define, console  */
/*
    TODO
        
 */
define(
    [
        'jquery', 'underscore'
    ],
    function(
        $, _
    ) {

        var PREFIX = 'data-linkage-'
        var ATTR_NAME = PREFIX + 'name'
        var ATTR_PARENT_NAME = PREFIX + 'parent-name'
        var ATTR_NAME_VALUE = '[' + ATTR_NAME + '="<%= name %>"]'
        var ATTR_PARENT_NAME_VALUE = '[' + ATTR_PARENT_NAME + '="<%= name %>"]'

        function linkage(container, callback) {
            var $container = $(container)
            var selector = '[' + ATTR_NAME + '],[' + ATTR_PARENT_NAME + ']'

            _valid($container, selector)

            $(container).on('change.linkage', selector, function(event) {
                if (event.target !== event.currentTarget) return
                var $currentTarget = $(event.currentTarget)
                _parent($currentTarget, $container)
                _children($currentTarget, $container)
                _siblings($currentTarget, $container)

                // _indeterminate($container)

                if (callback) callback(event, linkage.val(container), event.currentTarget)
            })

            // _indeterminate($container)

            return linkage
        }

        linkage.off = function(container) {
            var $container = $(container)
            var selector = '[' + ATTR_NAME + '],[' + ATTR_PARENT_NAME + ']'
            $container.off('click.linkage', selector)

            return linkage
        }

        linkage.val = function(container, values) {
            var $container = $(container)

            // linkage.val(container, values)
            if (values) {
                var checkboxs = $container.find('input:checkbox, input:radio')
                    .not(':disabled')
                    .prop('checked', false)
                _.each(values, function(item /*, index*/ ) {
                    var $target = checkboxs.filter('[value="' + item + '"]').prop('checked', true)
                    _.each($target, function(item /*, index*/ ) {
                        _parent($(item), $container)
                        _children($(item), $container)
                    })
                })
                return linkage
            }

            // linkage.val(container)
            values = []
            var checked = $container.find('input:checkbox:checked, input:radio:checked')
            _.each(checked, function(item /*, index*/ ) {
                var value = $(item).attr('value')
                if (value !== undefined && value !== '') values.push(value)
            })
            return values
        }

        function _valid($container, selector) {
            var $all = $container.find(selector)
            _.each($all, function(item /*, index*/ ) {
                var $item = $(item)
                var name = $item.attr(ATTR_NAME)
                var parentName = $item.attr(ATTR_PARENT_NAME)
                if (name === parentName) {
                    console.warn(
                        new Error(
                            _.template(
                                '<%= a %> and <%= b %> have save value "<%= value %>", may cause the Linkage to recursive search. You should avoid this kind of code.'
                            )({
                                a: ATTR_NAME,
                                b: ATTR_PARENT_NAME,
                                value: name
                            })
                        ).stack
                    )
                    console.warn(item)
                }
            })
        }

        function _parent($target, $container) {
            var name = $target.attr(ATTR_NAME)
            var parentName = $target.attr(ATTR_PARENT_NAME)

            if (!parentName) return
            if (name === parentName) return

            var $parent = $container.find(
                _.template(ATTR_NAME_VALUE)({
                    name: parentName
                })
            )
            if (!$parent.length) return

            var $siblings = $container.find(
                _.template(ATTR_PARENT_NAME_VALUE)({
                    name: parentName
                })
            )
            if (!$siblings.length) return

            // 复选框
            var $checkboxSiblings = $siblings.filter(':checkbox')
            var checkboxSiblingsStates = []
            _.each($checkboxSiblings, function(item /*, index*/ ) {
                checkboxSiblingsStates.push(
                    item.indeterminate ? false : item.checked
                )
            })

            // 复选框 半选
            var $indeterminateSiblings = $(
                _.filter($checkboxSiblings, function(item /*, index*/ ) {
                    return item.indeterminate
                })
            )

            // 单选框
            var $radioSiblings = $siblings.filter(':radio')
            var radioSiblingsNames = _.uniq(
                _.map($radioSiblings, function(item /*, index*/ ) {
                    return $(item).attr('name')
                })
            )
            var radioSiblingsStates = []
            _.each(radioSiblingsNames, function(name /*, index*/ ) {
                if (!name) return
                radioSiblingsStates.push(!!
                    $radioSiblings.filter('[name="' + name + '"]:checked').length
                )
            })


            var siblingsStates = _.uniq(
                checkboxSiblingsStates.concat(radioSiblingsStates)
            )
            $parent
                .prop(
                    'indeterminate',
                    $indeterminateSiblings.length ? true :
                    siblingsStates.length === 2 // [ true, false ]
                )
                .prop(
                    'checked',
                    $indeterminateSiblings.length ? false :
                    siblingsStates.length === 1 && siblingsStates[0]
                )

            _parent($parent, $container)
        }

        function _children($target, $container) {
            var name = $target.attr(ATTR_NAME)
            var parentName = $target.attr(ATTR_PARENT_NAME)
            var checked = $target.prop('checked')

            if (!name) return
            if (name === parentName) return

            var $children = $container.find(
                _.template(ATTR_PARENT_NAME_VALUE)({
                    name: name
                })
            )
            if (!$children.length) return

            var $enabledChildren = $children.not(':disabled')
            if (!$enabledChildren.length) return

            var $checkboxChildren = $enabledChildren.filter(':checkbox')
            $checkboxChildren.prop('checked', checked)

            var $radioChildren = $enabledChildren.filter(':radio')
            if (!checked) $radioChildren.prop('checked', checked)

            if (checked) {
                var radioNames = _.uniq(
                    _.map($radioChildren, function(item /*, index*/ ) {
                        return $(item).attr('name')
                    })
                )
                _.each(radioNames, function(name /*, index*/ ) {
                    if (!name) return
                    var $radioSameNameChildren = $radioChildren.filter('[name="' + name + '"]')
                    if (!$radioSameNameChildren.length) return
                    var radioSameNameChildrenStates = _.map($radioSameNameChildren, function(item /*, index*/ ) {
                        return $(item).prop('checked')
                    })
                    if (_.indexOf(radioSameNameChildrenStates, checked) !== -1) return
                    else $radioSameNameChildren.eq(0).prop('checked', checked)
                })
            }

            // $children.not(':disabled').prop('checked', checked)

            _.each($children, function(item /*, index*/ ) {
                _children($(item), $container)
            })
        }

        function _siblings($target, $container) {
            if (!$target.is(':radio')) return

            var name = $target.attr('name')
            var siblings = $container.find('[name="' + name + '"]').not($target)
            _.each(siblings, function(item /*, index*/ ) {
                var $item = $(item)
                _parent($item, $container)
                _children($item, $container)
            })
        }

        // function _indeterminate($container) {
        //     var $all = $container.find(
        //         '[' + ATTR_NAME + '],' +
        //         '[' + ATTR_PARENT_NAME + ']'
        //     )
        //     var $dink = $(
        //         _.filter($all, function(item /*, index*/ ) {
        //             var $item = $(item)
        //             var name = $item.attr(ATTR_NAME)
        //             var $children = $container.find(
        //                 _.template(ATTR_PARENT_NAME_VALUE)({
        //                     name: name
        //                 })
        //             )
        //             return !$children.length
        //         })
        //     )
        //     _.each($dink, function(item /*, index*/ ) {
        //         _parent($(item), $container)
        //     })
        // }

        return linkage
    }
)