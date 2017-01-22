/* global define */
define(
    [
        'jquery', 'underscore'
    ],
    function(
        $, _
    ) {

        function sticky(table, hooks) {
            var $table = $(table)
            var $wrapper = $table.parent()

            // 
            var stickyId = $table.attr('data-sticky-id') || _.uniqueId('sticky_')
            $('[data-table-id="' + stickyId + '"]', $wrapper).remove()
            $table.attr('data-sticky-id', stickyId)

            // 
            var $stickyWrapper = $('<div>')
                .attr('data-table-id', stickyId)
                .insertBefore($table)
            $wrapper.off('scroll.sticky.' + stickyId).on('scroll.sticky.' + stickyId,
                _.throttle(function(event) {
                    $stickyWrapper.scrollLeft(event.target.scrollLeft)
                }, 4)
            )

            // 
            var $stickyTable = $('<table><thead></thead></table>')
                .addClass($table.attr('class'))
                .appendTo($stickyWrapper)
            $stickyTable.find('> thead').html(
                $table.find('> thead').html()
            )

            // 完美克隆
            function fixStyle(event) {
                fixStickyWrapperStyle(event, $table, $wrapper, $stickyTable, $stickyWrapper)
                fixStickyTableStyle(event, $table, $wrapper, $stickyTable, $stickyWrapper)
            }

            fixStyle()
            $stickyWrapper.hide()

            // 
            toggleStickyWrapper(undefined, $table, $wrapper, $stickyTable, $stickyWrapper)
            $(document).off('scroll.sticky.' + stickyId).on('scroll.sticky.' + stickyId,
                _.throttle(function(event) {
                    toggleStickyWrapper(event, $table, $wrapper, $stickyTable, $stickyWrapper)
                    if ($stickyWrapper.is(':visible')) fixStyle(event)
                }, 100)
            )

            // 
            $(document).off('resize.sticky.' + stickyId)
                .on('resize.sticky.' + stickyId,
                    _.throttle(function(event) {
                        fixStyle(event)
                    }, 1000)
                )
        }

        function fixStickyWrapperStyle(event, $table, $wrapper, $stickyTable, $stickyWrapper) {
            $stickyWrapper.width($table.outerWidth())
            $stickyWrapper.css({
                position: 'fixed',
                left: $table.offset().left,
                top: 0,
                'z-index': 1,
                overflow: 'hidden'
            })
        }

        function fixStickyTableStyle(event, $table, $wrapper, $stickyTable, $stickyWrapper) {
            if (event && event.type === 'scroll') return

            $stickyTable.width($table.outerWidth())
            var $ths = $table.find('> thead > th')
            var $stickyThs = $stickyTable.find('> thead > th')
            _.each($ths, function($th, index) {
                $th = $($th)
                $($stickyThs[index]).css({
                    width: $th.outerWidth(),
                    height: $th.outerHeight(),
                    display: $th.css('display'),
                    'text-align': $th.css('text-align')
                })
            })
        }

        function toggleStickyWrapper(event, $table, $wrapper, $stickyTable, $stickyWrapper) {
            var scrollY = window.scrollY
            var tableHeight = $table.outerHeight()
            var tableTop = $table.offset().top
            var stickyWrapperHeight = $stickyWrapper.outerHeight()

            if (scrollY <= tableTop) {
                $stickyWrapper.hide()
                return
            }
            // tableTop < scrollY && scrollY <= tableTop + tableHeight
            if (tableTop < scrollY && scrollY <= tableTop + tableHeight - stickyWrapperHeight) {
                $stickyWrapper.show()
                return
            }
            if (tableTop < scrollY && scrollY > tableTop + tableHeight - stickyWrapperHeight) {
                $stickyWrapper.hide()
                return
            }
            if (scrollY > tableTop + tableHeight) {
                $stickyWrapper.hide()
                return
            }
        }

        return function(container) {
            var $container = $(container)
            var $tables
            if ($container.is('table')) $tables = $container
            else $tables = $(' table[data-sticky="true"]', $container)
            _.each($tables, function(table) {
                sticky(table)
            })
        }
    }
)