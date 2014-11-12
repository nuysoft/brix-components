<div class="datepickerwrapper <%= mode === 'multiple' ? 'multiple' : ''%>">
    <!--  -->
    <% if (mode === 'signal') { %>
    <div bx-name="components/datepicker" data-date="<%= dates[0] %>" data-type="date" class="picker"></div>
    <% } %>
    <!--  -->
    <% if (mode === 'multiple') { %>
    <div class="datepickerwrapper-inputs form-inline form-group">
        <% for (var i = 0; i < dates.length; i++ ) { %>
            <input type="text" class="form-control"> 
            <% if (i < dates.length - 1) { %> - <% } %>
        <% } %>
    </div>
    <div class="datepickerwrapper-pickers">
        <% for (var i = 0; i < dates.length; i++ ) { %>
            <div bx-name="components/datepicker" data-date="<%= dates[i] %>" data-type="date" class="picker"></div>
        <% } %>
    </div>
    <div>
        <button class="btn btn-default" bx-click="submit">确认</button>
        <a href="javascript: void(0);" class="ml5">取消</a>
    </div>
    <% } %>
</div>