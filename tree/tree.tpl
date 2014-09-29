<ul>
    <% for(var i = 0, item; item = children[i]; i++ ) { %>
        <li>
            <strong> <%= item.module.moduleId %></strong>
            -
            <span><%= item.module.clientId %></span>
            <%= item.childrenFn() %>
        </li>
    <% } %>
</ul>