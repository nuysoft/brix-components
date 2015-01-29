/* global define  */
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
            var selector = '[' + ATTR_NAME + '],[' + ATTR_PARENT_NAME + ']'
            $(container).on('click', selector, function(event) {
                _parent($(event.currentTarget), $(event.delegateTarget))
                _children($(event.currentTarget), $(event.delegateTarget))

                if (callback) callback(event, linkage.val(container), event.currentTarget)
            })
        }

        linkage.val = function(container, values) {
            if (values) {
                var checkboxs = $(container).find('input:checkbox').prop('checked', false)
                _.each(values, function(item /*, index*/ ) {
                    var $target = checkboxs.filter('[value="' + item + '"]').prop('checked', true)
                    _parent($target, $(container))
                    _children($target, $(container))
                })
                return linkage
            }

            values = []
            var checked = $(container).find('input:checkbox:checked')
            _.each(checked, function(item /*, index*/ ) {
                var value = $(item).attr('value')
                if (value !== undefined) values.push(value)
            })
            return values
        }

        function _parent($target, $container) {
            var parentName = $target.attr(ATTR_PARENT_NAME)

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

            $parent.prop('checked',
                $siblings.length === $siblings.filter(':checked').length
            )

            _parent($parent, $container)
        }

        function _children($target, $container) {
            var name = $target.attr(ATTR_NAME)
            var checked = $target.prop('checked')

            var $children = $container.find(
                _.template(ATTR_PARENT_NAME_VALUE)({
                    name: name
                })
            )

            if (!$children.length) return

            $children.prop('checked', checked)

            _.each($children, function(item /*, index*/ ) {
                _children($(item), $container)
            })
        }

        return linkage
    }
)