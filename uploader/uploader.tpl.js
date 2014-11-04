/* global define */
define(function() {
    return (function(){/*
<input name="<%= name %>" type="file" multiple="multiple">
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})