/* global define */
define(function() {
    return (function(){/*
<a href="javascript:;"><%= data %></a>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})