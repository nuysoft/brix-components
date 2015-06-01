/* global define */
define(function() {
    return (function(){/*
<p><%= message %> Works!</p>
    */}).toString().split("\n").slice(1,-1).join("\n")
})