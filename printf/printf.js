/* global define, console */

/*
    # Print Tool
    1. printf in JavaScript
    3. Prettify JSONArray to table

    ## External links

    http://en.wikipedia.org/wiki/Printf_format_string
    https://github.com/nuysoft/node-print
    
    ## Examples

    require(['printf'], function(printf) {
        window.printf = printf
    })
*/

define(function( /*require, exports, module*/ ) {

    var rformat = /%([-+]?)(\d+)?(?:\.?(\d+)?)(s|d)/ig

    /*
        printf(format, args)
        format
            %-ms    - String
            %-m.nd  - Number (both integer and float)
            %-mj    - JSON
     */
    function printf(format, args) {
        // 参数 format 不是字符串，或者不含有格式标记，则不做格式化，直接输出
        if (typeof format !== 'string' || !format.match(rformat)) {
            console.log.apply(console, arguments)
            return
        }

        // 格式化
        args = [].slice.call(arguments, 1)
        var index = 0
        /* jshint unused:false */
        var out = format.replace(rformat, function(match, dir, m, n, flag) {
            // console.log(match, dir, m, n, flag)
            var arg = args[index++] + ''
            var prefix = ''
            var suffix = ''
            switch (flag) {
                case 's':
                    break
                case 'd':
                    var indexOf = arg.indexOf('.')
                    if (n && ~indexOf) arg = arg.slice(0, indexOf + 1 + parseInt(n))
                    break
                case 'j':
                    arg = JSON.stringify(arg)
                    break
            }
            // dir m
            var fix = parseInt(m) - arg.length
            for (var i = 0; i < fix; i++) {
                if (dir === '-') suffix += ' '
                else prefix += ' '
            }
            return prefix + arg + suffix
        })
        console.log(out)
    }

    /*
        重复打印
    */
    printf.re = function(str, n) {
        var re = ''
        for (var i = 0; i < n; i++) {
            re += str
        }
        console.log(re)
    }

    printf.table = function(rs) {
        if (!rs || !rs.length) return
        var style = genStyle(rs)
        var devider = genDevider(style)
        var th = genTh(style)
        var trs = genTr(rs, style)

        // console.log(style)

        console.log(devider)
        console.log(th)
        console.log(devider)
        for (var tr in trs) {
            console.log(trs[tr])
        }
        console.log(devider)
    }

    function getLen(o) {
        var rcjk = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g
        o = '' + o
        var re = 0
        for (var i = 0; i < o.length; i++) {
            if (o[i].match(rcjk)) re += 2
            else re += 1
        }
        return re
    }

    function genStyle(rs) {
        var style = {}
        var key, r

        // init
        for (r in rs) {
            for (key in rs[r]) {
                style[key] = getLen(key)
            }
        }
        // calculate max width of a colume
        var width = 0
        for (key in style) {
            for (r in rs) {
                width = getLen(rs[r][key])
                style[key] = width > style[key] ? width : style[key]
            }
        }
        return style
    }

    function genDevider(style) {
        var devider = '+'
        for (var key in style) {
            for (var i = 0; i < style[key] + 2; i++) {
                devider += '-'
            }
            devider += '+'
        }
        return devider
    }

    function genTh(style) {
        var header = '|'
        for (var key in style) {
            header += ' '
            header += key
            for (var i = 0; i < style[key] + 2 - 1 - getLen(key); i++) {
                header += ' '
            }
            header += '|'
        }
        return header
    }

    function genTr(rs, style) {
        var trs = []
        var tr
        for (var r in rs) {
            tr = '|'
            for (var key in style) {
                tr += ' '
                tr += rs[r][key]
                for (var i = 0; i < style[key] + 2 - 1 - getLen(rs[r][key]); i++) {
                    tr += ' '
                }
                tr += '|'
            }
            trs.push(tr)
        }
        return trs
    }

    return printf
})