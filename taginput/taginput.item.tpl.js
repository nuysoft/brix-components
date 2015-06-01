/* global define */
define(function() {
    return (function(){/*
<div class="taginput-item" bx-click=""><!-- _active -->
    <div class="taginput-item-name"><%= data %></div>
    <div class="taginput-item-delete" bx-click="delete" data-taginput-clientid="<%= clientId %>">
        <span class="glyphicon glyphicon-remove"></span>
    </div><!-- &times; -->
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})