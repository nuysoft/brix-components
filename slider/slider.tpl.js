/* global define */
define(function() {
    return (function(){/*
<ul>
	<li>moduleId: <%= moduleId %></li>
	<li>clientId: <%= clientId %></li>
	<li>parentClientId: <%= parentClientId %></li>
	<li>childClientIds: <%= childClientIds %></li>
</ul>
    */}).toString().split("\n").slice(1,-1).join("\n")
})