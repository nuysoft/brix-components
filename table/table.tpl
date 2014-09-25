<table class="table table-hover">
  <thead>
    <tr>
      <th><input type="checkbox"></th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <% for( var i = 0, item; item = data[i]; i++ ) { %>
      <tr>
        <td><input type="checkbox"></td>
        <td><%= item.first %></td>
        <td><%= item.last %></td>
        <td><%= age %></td>
      </tr>
    <% } %>
  </tbody>
</table>