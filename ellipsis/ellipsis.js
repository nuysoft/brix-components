/* global define, window, setTimeout, clearTimeout */
/*
    http://caniuse.com/#search=ellipsis
    https://github.com/jjenzz/jquery.ellipsis
    支持中文
 */
define(
    [
        'jquery', 'underscore',
        'brix/base'
    ],
    function(
        $, _,
        Brix
    ) {
        var ellipClass = 'ellip'
        var ellipLineClass = 'ellip' + '-line'

        return Brix.extend({
            options: {
                lines: 'auto'
            },
            init: function() {
                if (this.options.lines !== 'auto') this.options.lines = +this.options.lines

                this.$element = $(this.element)
                this._text = this.$element.text()
                this._height = this.$element.height()

                this.$relatedElement = $('<span class="' + ellipClass + '" />')
                    .text(this._text)
                this.$element.empty().append(this.$relatedElement)
            },
            render: function() {
                if (this.options.lines === 1) {
                    this.$relatedElement.addClass(ellipLineClass)
                    return
                }
                if (this.options.lines === 'auto' && this.$relatedElement.prop('scrollHeight') <= this._height) {
                    return
                }

                var words = this.parseWords(this._text)
                var start = this.parseStart(this.options.lines, words)
                this.update(words, start)

                var that = this
                var type = 'click.ellipsis_' + this.options.clientId
                $(window)
                    .off(type)
                    .on(type, function() {
                        that.render()
                    })
            },
            update: function(words, start) {
                words[start] = '<span class="' + ellipLineClass + '">' + words[start]
                words.push('</span>')
                this.$relatedElement.html(words.join(''))
            },
            parseStart: function(mode, words) {
                var spans = _.map(words, function(item /*, index*/ ) {
                    // if (!!item.match(/^\s+$/)) return ' '
                    return '<span>' + item + '</span>'
                })
                this.$relatedElement.html(spans.join(''))

                spans = this.$relatedElement.find('span')

                return mode === 'auto' ? this.parseStartByHeight(spans) : this.parseStartByLines(spans)
            },
            parseStartByLines: function(spans) {
                var start
                var top, currentTop, currentLine = 0
                for (var i = 0; i < spans.length; i++) {
                    top = $(spans[i]).position().top
                    if (top !== currentTop) {
                        currentTop = top
                        currentLine += 1
                    }
                    if (currentLine === this.options.lines) {
                        start = i
                        break
                    }
                }
                return start
            },
            parseStartByHeight: function(spans) {
                var start
                var top, height, currentTop, currentLine = 0
                var buffer = {}
                for (var i = 0; i < spans.length; i++) {
                    top = $(spans[i]).position().top
                    height = height || $(spans[i]).height()
                    if (top !== currentTop) {
                        currentTop = top
                        currentLine += 1
                        buffer[currentLine] = [spans[i]]
                    } else {
                        buffer[currentLine].push([spans[i]])
                    }
                    if (top + height > this._height) {
                        start = i - buffer[currentLine - 1].length
                        break
                    }
                }
                return start
            },
            parseWords: function parseWords(text) {
                return $.trim(text).split('')
            },
            resize: function() {
                var that = this
                clearTimeout(this.resizeTimer)
                this.resizeTimer = setTimeout(function() {
                    that.render()
                }, 100)
            }

            // JSON.stringify(parseWords('11一一22二二33三三44 11一一22二二33三三44'), null, 4)
        })
    }
)