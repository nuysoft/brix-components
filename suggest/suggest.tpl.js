/* global define */
define(function() {
    return (function(){/*
<div class="suggest">
	<ul class="dropdown-menu">
		<% for ( var i = 0; i < data.length; i++ ) { %>
    	<li><a tabindex="-1" href="javascript:;"><%= data[i] %></a></li>
    	<% } %>
  	</ul>
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})