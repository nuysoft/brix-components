/* global define */
define(function() {
    return (function(){/*
<span class="tree-node-content-name"><%= name %></span>
    */}).toString().split("\n").slice(1,-1).join("\n")
})