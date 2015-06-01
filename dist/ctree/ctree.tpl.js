/* global define */
define(function() {
    return (function(){/*
<ul>
    <% for(var i = 0, item; item = children[i]; i++ ) { %>
        <li>
            <strong title="moduleId"> <%= item.module.moduleId %></strong>
            -
            <small title="clientId"><%= item.module.clientId %></small>
            <%= item.childrenFn() %>
        </li>
    <% } %>
</ul>
    */}).toString().split("\n").slice(1,-1).join("\n")
})