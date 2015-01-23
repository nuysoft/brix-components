/* global define */
define(function() {
    return (function(){/*
<div class="taginput" bx-click="_focus">
	<div class="taginput-placeholder hide <%= data.length ? 'hide' : '' %>"><%= placeholder %></div>
	<input bx-name="components/suggest" class="taginput-input">
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})