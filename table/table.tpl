<table class="table table-hover">
  <thead>
    <th><input type="checkbox"></th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Age</th>
  </thead>
  <tbody>
    <% for( var i = 0, item; item = data[i]; i++ ) { %>
      <td><input type="checkbox"></td>
      <td><%= item.first %></td>
      <td><%= item.last %></td>
      <td><%= age %></td>
    <% } %>
  </tbody>
</table>