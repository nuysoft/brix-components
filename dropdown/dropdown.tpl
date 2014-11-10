<div class="dropdown">
    <button class="btn btn-default dropdown-toggle" type="button" value="<%= value %>" bx-click="toggle()">
        <span><%= label %></span>
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
        <% for(var i = 0, item; item = data[i]; i++ ) { %>
            <% if(item.children) { %>
                <li class="dropdown-header"><%=item.label%></li>
                <% for(var ii = 0; ii < item.children.length; ii++ ) { %>
                    <li><a href="javascript: void(0);" value="<%= item.children[ii].value %>" bx-click="_select()"><%= item.children[ii].label %></a></li>
                <% } %>
            <% } else { %>
                <% if(item === 'divider') { %>
                    <li class="divider"></li>
                <% } else { %>
                    <li><a href="javascript: void(0);" value="<%= item.value %>" bx-click="_select()"><%= item.label %></a></li>
                <% }  %>
            <% } %>
        <% } %>
  </ul>
</div>