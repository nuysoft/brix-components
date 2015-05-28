/* global define */
define(function() {
    return (function(){/*
<div class="dropdown">
    <button class="btn btn-default dropdown-toggle" type="button" value="<%= value %>" bx-click="toggle()">
        <span class="dropdown-toggle-label"><%= label %></span>
        <!-- <span class="caret"> -->
        <span class="caret_brixfont">
            <span class="brixfont fontsize-14">&#xe623;</span><!-- 向下 -->
            <span class="brixfont fontsize-14">&#xe62e;</span><!-- 向上 -->
        </span>
    </button>
    <ul class="dropdown-menu">
        <% for(var i = 0, item; item = data[i]; i++ ) { %>
            <% if(item.children) { %>
                <li class="dropdown-header"><%=item.label%></li>
                <% for(var ii = 0; ii < item.children.length; ii++ ) { %>
                    <li class="<%= item.children[ii].value == value ? 'active' : ''%>"><a href="javascript: void(0);" value="<%= item.children[ii].value %>" bx-click="_select()"><%= item.children[ii].label %></a></li>
                <% } %>
            <% } else { %>
                <% if(item === 'divider') { %>
                    <li class="divider"></li>
                <% } else { %>
                    <li class="<%= item.value == value ? 'active' : ''%>"><a href="javascript: void(0);" value="<%= item.value %>" bx-click="_select()"><%= item.label %></a></li>
                <% }  %>
            <% } %>
        <% } %>
  </ul>
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})