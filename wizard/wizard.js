/* global define */
/*
    https://github.com/amoffat/bootstrap-application-wizard
 */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        /*'./wizard.tpl.js',*/
        'css!./wizard.css'
    ],
    function(
        $, _,
        Brix, EventManager
        /*, template*/
    ) {
        var ANIMATIONEND = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'

        function Wizard() {}

        _.extend(Wizard.prototype, Brix.prototype, {
            options: {
                cursor: 0,
                total: 3,
                horizontal: true, // 水平
                vertical: false // 垂直
            },
            init: function() {
                this.$element = $(this.element)
                if (this.$element.hasClass('wizard-vertical')) {
                    this.options.horizontal = false
                    this.options.vertical = true
                }
            },
            render: function() {
                var manager = new EventManager()

                this.data = this.data || _.extend({}, this.options)
                    // var html = _.template(template)(this.data)
                    // $(this.element).append(html)

                manager.delegate(this.element, this)

                this.move(undefined, 0)
            },
            move: function(event, dir) { /* jshint unused:false */
                if (this.options.horizontal) { // 水平
                    var cursor = this.options.cursor
                    var total = this.options.total
                    var newCursor = (cursor + dir) % this.options.total

                    // wizard-nav
                    var lis = $('ol.wizard-nav li.item', this.element)
                    lis.removeClass('active').removeClass('bx-trans-steps-on')
                        .eq(newCursor).addClass('active').addClass('bx-trans-steps-on')
                    if (cursor < newCursor) lis.eq(cursor).addClass('resolved')

                    // wizard-cards
                    var cards = $('.wizard-cards .wizard-card', this.element).hide()
                    var card = cards.eq(cursor).show()
                    var newCard = cards.eq(newCursor).show()
                    var cardClass = cursor == newCursor ? '' :
                        cursor < newCursor ? 'out bx-anim-fade-out-left' :
                        'out bx-anim-fade-out-right'
                    var newCardClass = cursor == newCursor ? '' :
                        cursor < newCursor ? 'bx-anim-fade-in-left' :
                        'bx-anim-fade-in-right'

                    card.addClass(cardClass)
                    if (cursor != newCursor) {
                        card.one(ANIMATIONEND, function(event) {
                            $(event.target).removeClass(cardClass).hide()
                        })
                    }
                    newCard.addClass(newCardClass)
                        .one(ANIMATIONEND, function(event) {
                            $(event.target).removeClass(newCardClass)
                        })

                    // wizard-footer
                    var next = $('.wizard-next', this.element)
                    var back = $('.wizard-back', this.element)
                    next.html(newCursor === total - 2 ? '完成' : '下一步')
                    next[(newCursor === total - 1) ? 'hide' : 'show']()
                    back[(newCursor === 0 || newCursor === total - 1) ? 'hide' : 'show']()

                    this.options.cursor = newCursor
                }

                return this
            },
            next: function(event) {
                if (this.options.horizontal) { // 水平
                    this.move(event, 1)
                }

                if (this.options.vertical) { // 垂直
                    $(event.currentTarget)
                        .parents('.wizard-card').removeClass('active').removeClass('bx-trans-steps-on').addClass('resolved')
                        .next().addClass('active').addClass('bx-trans-steps-on')
                }

                return this
            },
            back: function(event) {
                this.move(event, -1)
            },
            expand: function(event) {
                if (this.options.vertical) {
                    $(event.currentTarget)
                        .parents('.wizard-card').addClass('active').addClass('bx-trans-steps-on')
                        .siblings().removeClass('active').removeClass('bx-trans-steps-on')
                }
                return this
            }
        })

        return Wizard
    }
)