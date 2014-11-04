/* global define */
define(function() {
    return (function(){/*
<ul>
    <% for(var i = 0, item; item = children[i]; i++ ) { %>
        <li>
            <strong> <%= item.module.moduleId %></strong>
            -
            <small><%= item.module.clientId %></small>
            <%= item.childrenFn() %>
        </li>
    <% } %>
</ul>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})