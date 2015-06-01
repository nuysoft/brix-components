/* global define */
define(function() {
    return (function(){/*
<div>
	id: <%= id %>,
	name: <span class="tree-node-content-name"><%= name %></span>,
	operation: <a href="#" style="float: right;">+</a>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})