<div class="taginput">
	<div class="taginput-placeholder <%= data.length ? 'hide' : '' %>"><%= placeholder %></div>
	<% for ( var i = 0; i < data.length; i++ ) { %>
	<div class="taginput-item">
		<span><%= data[i] %></span>
		<span class="taginput-item-close">&times;</span>
	</div>
	<% } %>
	<input bx-name="components/suggest" class="taginput-input">
</div>