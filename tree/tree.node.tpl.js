/* global define */
define(function() {
    return (function(){/*
<span><%= id %></span>
 -
<span><%= name %></span>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})