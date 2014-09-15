<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" value="<%=value%>" bx-click="toggle()">
    <span><%=label%></span>
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
    <% for(var i = 0; i < data.length; i++ ) { %>
    <li><a tabindex="-1" href="javascript:void(0);" value="<%=data[i].value%>" bx-click="select()"><%=data[i].label%></a></li>
    <% } %>
  </ul>
</div>