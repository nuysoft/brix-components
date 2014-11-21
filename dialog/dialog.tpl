<div class="dialog <%= placement %>">
    <button bx-click="hide" type="button" class="close <%= closable ? '' : 'hide' %>">×</button>
    <div class="content">
        <%= content %>
        <!-- 
        <h4>Title</h4>
        <hr>
        <ul>
            <li>moduleId: <%= moduleId %></li>
            <li>clientId: <%= clientId %></li>
            <li>parentClientId: <%= parentClientId %></li>
            <li>childClientIds: <%= childClientIds %></li>
        </ul>
        <hr>
        <div>
            <button bx-click="hide" type="button" class="btn btn-primary">Save</button>
            <a bx-click="hide" href="javascript: void(0);" class="ml5">Close</a>
        </div>
         -->
    </div>
</div>