/* global define */
define(function() {
    return (function(){/*
<span class="switch 
	<%= checked ? 'switch-checked' : '' %> 
	<%= disabled ? 'switch-disabled' : '' %>
	<%= size ? 'switch-' + size : '' %>
	" bx-click="toggle">
	<small></small>
</span>
    */}).toString().split("\n").slice(1,-1).join("\n")
})