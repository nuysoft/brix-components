<div class="taginput" bx-click="focus">
	<div class="taginput-placeholder <%= data.length ? 'hide' : '' %>"><%= placeholder %></div>
	<% for ( var i = 0; i < data.length; i++ ) { %>
	<div class="taginput-item" bx-click="active">
		<div class="taginput-item-name"><%= data[i] %></div>
		<div class="taginput-item-delete glyphicon glyphicon-remove" bx-click="delete"></div><!-- &times; -->
	</div>
	<% } %>
	<input bx-name="components/suggest" class="taginput-input">
</div>