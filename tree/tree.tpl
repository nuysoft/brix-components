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