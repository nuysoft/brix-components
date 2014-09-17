/*
    http://etaoux.github.io/brix/gallery/tables/
*/
require.config({
    map: {
        // 插件
        '*': {
            css: '/brix-gallery/bower_components/require-css/css.js',
            less: '/brix-gallery/bower_components/require-less/less.js',
            text: '/brix-gallery/bower_components/requirejs-text/text.js'
        }
    },
    paths: {
        // 运行依赖库
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        // 组件
        'gallery':'/brix-gallery/',
        'gallery/hello': '/brix-gallery/hello/hello',
        'gallery/dropdown': '/brix-gallery/dropdown/dropdown',
        'gallery/pagination': '/brix-gallery/pagination/pagination',
        'gallery/pure-pagination': '/brix-gallery/pagination/pure-pagination',
        'gallery/colorpicker': '/brix-gallery/colorpicker/colorpicker'
    }
})