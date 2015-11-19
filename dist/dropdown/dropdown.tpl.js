/* global define */
define(function() {
    return (function(){/*
<div class="dropdown <%= disabled ? 'disabled' : '' %> <%= searchbox ? 'dropdown-searchbox' : '' %> <%= popover ? 'dropdown-popover' : '' %>">
    <button class="btn btn-default dropdown-toggle" type="button" value="<%= value %>" bx-click="toggle()">
        <span class="dropdown-toggle-label"><%= label %></span>
        <!-- <span class="caret"> -->
        <span class="caret_custom caret_brixfont"><!-- 保留 caret_brixfont 是为了向后兼容，在下个版本中移除  -->
            <span class="brixfont down">&#xe623;</span><!-- 向下 &#xe623; -->
            <span class="brixfont up">&#xe62e;</span><!-- 向上 &#xe62e;-->
        </span>
    </button>
    <div class="dropdown-menu-wrapper">
        <div class="searchbox <%= searchbox ? '' : 'hide' %>">
            <label>
                <span class="brixfont">&#xe61c;</span>
                <input bx-keyup="search()" type="text" placeholder="<%= placeholder %>">
            </label>
        </div>
        <ul class="dropdown-menu">
            <% for(var i = 0, item; item = data[i]; i++ ) { %>
                <% if(item.children) { %>
                    <li class="dropdown-header"><%=item.label%></li>
                    <% for(var ii = 0; ii < item.children.length; ii++ ) { %>
                        <li class="<%= item.children[ii].value == value ? 'active' : ''%>">
                            <% if (popover) { %>
                            <a href="javascript:;" value="<%= item.children[ii].value %>" bx-click="select()"
                                bx-name="components/popover"
                                data-content="<%= item.children[ii].label %>" 
                                data-width="<%= _popoverWidth %>">
                                <span><%= item.children[ii].label %></span>
                            </a>
                            <% } else { %>
                            <a href="javascript:;" value="<%= item.children[ii].value %>" bx-click="select()">
                                <span><%= item.children[ii].label %></span>
                            </a>
                            <% } %>    
                        </li>
                    <% } %>
                <% } else { %>
                    <% if (item === 'divider') { %>
                        <li class="divider"></li>
                    <% } else { %>
                        <li class="<%= item.value == value ? 'active' : ''%>">
                            <% if (popover) { %>
                            <a href="javascript:;" value="<%= item.value %>" bx-click="select()"
                                bx-name="components/popover"
                                data-content="<%= item.label %>" 
                                data-width="<%= _popoverWidth %>">
                                <span><%= item.label %></span>
                            </a>
                            <% } else { %>
                            <a href="javascript:;" value="<%= item.value %>" bx-click="select()">
                                <span><%= item.label %></span>
                            </a>
                            <% } %>    
                        </li>
                    <% }  %>
                <% } %>
            <% } %>
        </ul>
    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})