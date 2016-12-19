<div class="dropdown 
    <%= disabled ? 'disabled' : '' %> 
    <%= multiple ? 'dropdown-multiple' : '' %> 
    <%= searchbox ? 'dropdown-searchbox' : '' %> 
    <%= popover ? 'dropdown-popover dropdown-ellipsis' : '' %>
    <%= justify ? 'dropdown-justify' : '' %>">
    <button class="btn btn-default dropdown-toggle" type="button" value="<%= value %>" bx-click="toggle()">
        <span class="dropdown-toggle-label"><%= label %></span>
        <!-- <span class="caret"> -->
        <span class="caret_custom caret_brixfont"><!-- 保留 caret_brixfont 是为了向后兼容，在下个版本中移除  -->
            <span class="brixfont down">&#xe623;</span><!-- 向下 &#xe623; -->
            <span class="brixfont up">&#xe62e;</span><!-- 向上 &#xe62e;-->
        </span>
    </button>
    <div class="dropdown-menu-wrapper">
        <% if (searchbox) { %>
        <div class="searchbox">
            <label>
                <span class="brixfont">&#xe61c;</span>
                <input bx-keyup="search()" type="text" placeholder="<%= placeholder %>">
            </label>
        </div>
        <% } %>
        <ul class="dropdown-menu">
            <% for(var i = 0, item; item = data[i]; i++ ) { %>
                <% if(item.children) { %>
                    <li class="dropdown-header"><%=item.label%></li>
                    <% for(var ii = 0; ii < item.children.length; ii++ ) { %>
                        <li class="dropdown-menu-item-child <%= item.children[ii].value == value && !item.children[ii].excluded ? 'active' : ''%>" <%= item.children[ii].excluded ? 'data-excluded=true': '' %>>
                            <% if (popover) { %>
                            <a href="javascript:;" value="<%= item.children[ii].value %>" bx-click="select()"
                                bx-name="components/popover"
                                data-content="<%= item.children[ii].label %>" 
                                data-width="<%= _popoverWidth %>">
                                <% if (multiple && !item.children[ii].excluded) { %>
                                <input type="checkbox" name="<%= name %>" <%= isActive(value, item.children[ii].value) ? 'checked' : '' %>>
                                <% } %>
                                <span><%= item.children[ii].label %></span>
                            </a>
                            <% } else { %>
                            <a href="javascript:;" value="<%= item.children[ii].value %>" bx-click="select()"
                                title="<%= item.children[ii].label %>">
                                <% if (multiple && !item.children[ii].excluded) { %>
                                <input type="checkbox" name="<%= name %>" <%= isActive(value, item.children[ii].value) ? 'checked' : '' %>>
                                <% } %>
                                <span><%= item.children[ii].label %></span>
                            </a>
                            <% } %>    
                        </li>
                    <% } %>
                <% } else { %>
                    <% if (item === 'divider') { %>
                        <li class="divider"></li>
                    <% } else { %>
                        <li class="<%= isActive(value, item.value) && !item.excluded ? 'active' : '' %>" <%= item.excluded ? 'data-excluded=true': '' %>>
                            <% if (popover) { %>
                            <a href="javascript:;" value="<%= item.value %>" bx-click="select()"
                                bx-name="components/popover"
                                data-content="<%= item.label %>" 
                                data-width="<%= _popoverWidth %>">
                                <% if (multiple && !item.excluded) { %>
                                <input type="checkbox" name="<%= name %>" <%= isActive(value, item.value) ? 'checked' : '' %>>
                                <% } %>
                                <span><%= item.label %></span>
                            </a>
                            <% } else { %>
                            <a href="javascript:;" value="<%= item.value %>" bx-click="select()"
                                title="<%= item.label %>">
                                <% if (multiple && !item.excluded) { %>
                                <input type="checkbox" name="<%= name %>" <%= isActive(value, item.value) ? 'checked' : '' %>>
                                <% } %>
                                <span><%= item.label %></span>
                            </a>
                            <% } %>
                        </li>
                    <% }  %>
                <% } %>
            <% } %>
        </ul>
        <% if (multiple) { %>
        <div class="dropdown-footer">
            <button type="button" class="btn btn-default submit" bx-click="submit">确认</button>
            <a href="javascript: void(0);" bx-click="hide" class="btn btn-default cancel ml5">取消</a>
        </div>
        <% } %>
    </div>
</div>