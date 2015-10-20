/* global define, document */
/*
    http://getbootstrap.com/components/#dropdowns
    http://silviomoreto.github.io/bootstrap-select/
 */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        './dropdown.tpl.js'
    ],
    function(
        $, _,
        Brix, EventManager
    ) {
        /*
            非 Select Dropdown
        */

        function Dropdown() {}

        _.extend(Dropdown.prototype, Brix.prototype, {
            init: function() {
                this.$element = $(this.element)
            },
            render: function() {
                var manager = new EventManager('bx-')
                manager.delegate(this.$element, this)

                this._autoHide()
            },
            toggle: function( /*event*/ ) {
                this.$element.toggleClass('open')
                return this
            },
            show: function() {
                this.$element.addClass('open')
                return this
            },
            hide: function() {
                this.$element.removeClass('open')
                return this
            },
            _autoHide: function() {
                var that = this
                var type = 'click.dropdown_autohide_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (that.$element.has(event.target).length) return
                        that.hide()
                    })
            },
            destroy: function() {
                var type = 'click.dropdown_autohide_' + this.clientId
                $(document.body).off(type)
            }
        })

        return Dropdown
            // return Brix.extend()
    }
)