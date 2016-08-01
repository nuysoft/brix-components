/* global define */
/*
    https://github.com/chjj/marked
        A markdown parser and compiler. Built for speed.
    https://github.com/tanakahisateru/js-markdown-extra
        PHP-Markdown-extra compatible Javascript markdown syntax parser
 */
define(
    [
        'marked'
    ],
    function(
        marked
    ) {

        var RE_ATTR = /\{\s*([#.].*)\s*\}$/
        var renderer = new marked.Renderer()
        renderer.paragraph = function(text) {
            var ma = RE_ATTR.exec(text)
            var attrs
            var classes = ''
            var result = '<p'
            if (ma) {
                attrs = ma[1].split(' ')
                for (var i = 0; i < attrs.length; i++) {

                    switch (attrs[i][0]) {
                        case '#':
                            result += ' id="' + attrs[i].slice(1) + '" '
                            break
                        case '.':
                            classes += ' ' + attrs[i].slice(1)
                            break
                    }
                }
                if (classes) result += ' class="' + classes + '" '
                text = text.replace(RE_ATTR, '')
            }
            return result + '>' + text + '</p>\n'
        }

        return renderer
    }
)