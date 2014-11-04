/* global define */
define(function() {
    return (function(){/*
<ul class="sidebar sidebar-<%= deep %>" data-deep="<%= deep %>">
    <% for(var i = 0, item; item = children[i]; i++ ) { %>
        <li>
            <a href="#<%= item.label %>" class="sidebar-link sidebar-link-<%= item.deep %>">
                <i class="<%= item.icon %>"></i>
                <%= item.label %>
            </a>
            <%= item.childrenFn() %>
        </li>
    <% } %>
</ul>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})