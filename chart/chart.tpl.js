/* global define */
define(function() {
    return (function(){/*
<canvas width="<%= width %>" height="<%= height %>"></canvas>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})