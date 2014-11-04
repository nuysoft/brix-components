/* global define */
define(function() {
    return (function(){/*
<p>Hello <%= message %>!</p>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})