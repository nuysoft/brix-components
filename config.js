/* global require */
require.config({
    map: {
        // 插件
        '*': {
            css: 'bower_components/require-css/css.js',
            less: 'bower_components/require-less/less.js',
            text: 'bower_components/requirejs-text/text.js'
        }
    },
    paths: {
        // brix
        'loader': 'bower_components/brix-loader/dist/loader',
        'base': 'bower_components/brix-base/src/',

        // 组件
        'components': 'bower_components/brix-components/',
        'components/hello': 'bower_components/brix-components/hello/hello',
        'components/hello-extra': 'bower_components/brix-components/hello-extra/hello-extra',
        'components/dropdown': 'bower_components/brix-components/dropdown/dropdown',
        'components/pagination': 'bower_components/brix-components/pagination/pagination',
        'components/pure-pagination': 'bower_components/brix-components/pagination/pure-pagination',
        'components/colorpicker': 'bower_components/brix-components/colorpicker/colorpicker',
        'components/modal': 'bower_components/brix-components/modal/modal',
        'components/table': 'bower_components/brix-components/table/table',
        'components/datepicker': 'bower_components/brix-components/datepicker/datepicker',
        'components/popover': 'bower_components/brix-components/popover/popover',
        'components/uploader': 'bower_components/brix-components/uploader/uploader',
        'components/editor': 'bower_components/brix-components/editor/editor',
        'components/editable': 'bower_components/brix-components/editable/editable',
        'components/spin': 'bower_components/brix-components/spin/spin',
        'components/countdown': 'bower_components/brix-components/countdown/countdown',
        'components/sidebar': 'bower_components/brix-components/sidebar/sidebar',
        'components/chart': 'bower_components/brix-components/chart/chart',
        'components/imager': 'bower_components/brix-components/imager/imager',
        'components/nprogress': 'bower_components/brix-components/nprogress/nprogress',

        'components/tree': 'bower_components/brix-components/tree/tree',
        'components/header': 'bower_components/brix-components/header/header',
        'components/footer': 'bower_components/brix-components/footer/footer',
        'components/sticky': 'bower_components/brix-components/sticky/sticky',
        'components/nav': 'bower_components/brix-components/nav/nav',
        'components/readme': 'bower_components/brix-components/readme/readme',
        'components/css-layout-debugger': 'bower_components/brix-components/css-layout-debugger/css-layout-debugger',
        'components/boilerplate': 'bower_components/brix-components/boilerplate/boilerplate',

        // 运行依赖库
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        moment: 'bower_components/moment/moment',
        mousetrap: 'bower_components/mousetrap/mousetrap',
        mock: 'bower_components/mockjs/dist/mock',
        marked: 'bower_components/marked/lib/marked',
        'marked-extra': 'bower_components/brix-components/marked-extra/marked-extra',
        d3: 'bower_components/d3/d3',
        Chart: 'bower_components/chartjs/Chart',
        director: 'bower_components/director/build/director',
        highlightjs: 'bower_components/highlightjs/highlight.pack',
        nprogress: 'bower_components/nprogress/nprogress'
    },
    shim: {
        Chart: {
            exports: 'Chart'
        },
        director: {
            exports: 'Router'
        },
        highlightjs: {
            exports: 'hljs'
        }
    }
})