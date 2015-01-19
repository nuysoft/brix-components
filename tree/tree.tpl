<ul class="tree">
    <% for(var i = 0, item; item = children[i]; i++ ) { %>
        <li class="node <%= item.children && item.children.length ? '': 'leaf' %>">
        	<div class="tree-toggle">
        		<span class="glyphicon glyphicon-minus-sign"></span>
            	<!-- <span><%= item.id %></span> -->
            	 <!-- -  -->
            	<span><%= item.name %></span>
            </div>
        	<%= item.childrenFn() %>
        </li>
    <% } %>
</ul>