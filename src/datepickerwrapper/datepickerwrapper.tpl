<div class="datepickerwrapper <%= placement %> <%= mode === 'multiple' ? 'multiple' : 'single' %>">
    <!--  -->
    <% if (mode === 'signal') { %>
    <div bx-name="<%= calendar %>" data-type="<%= type %>" data-date="<%= dates[0] %>" data-range="<%= _ranges %>" data-excluded="<%= _excludeds %>" data-unlimit="<%= unlimits[0] %>" data-pages="<%= pages %>" class="picker"></div>
    <% } %>
    <!--  -->
    <% if (mode === 'multiple') { %>
    <% if( shortcuts ) { %>
    <div class="datepickerwrapper-shortcuts form-inline form-group">
        <div class="datepickerwrapper-shortcuts-header">
            <div class="datepickerwrapper-shortcuts-header-title">快捷日期</div>
        </div>
        <div class="datepickerwrapper-shortcuts-body clearfix">
            <% for (var title in shortcuts) { %>
                <span bx-click="_change('shortcut')" data-value="<%= 
                    _.map(shortcuts[title], function(item) {
                        return item.format('YYYY-MM-DD HH:mm:ss')
                    }).join(',')
                %>" class="shortcut"><%= title %></span>
            <% } %>
        </div>
    </div>
    <% } %>
    <div class="datepickerwrapper-inputs form-inline form-group">
        <div class="datepickerwrapper-inputs-header">
            <div class="datepickerwrapper-inputs-header-title">日期范围</div>
        </div>
        <div class="datepickerwrapper-inputs-body <%= typeMap.time ? 'time' : '' %>">
            <% for (var i = 0; i < dates.length; i++ ) { %>
                <input bx-click="_inputToggleDatePicker(<%= i %>)" bx-change="_change('date', <%= i %>)" value="<%= dates[i] %>" type="text" class="form-control">
                <%= i < dates.length -1 ? '-' : '' %>
            <% } %>
        </div>
    </div>
    <div class="datepickerwrapper-pickers">
        <% for (var i = 0; i < dates.length; i++ ) { %>
            <div bx-name="<%= calendar %>" data-type="<%= type %>" data-date="<%= dates[i] %>" data-range="<%= _ranges %>" data-excluded="<%= _excludeds %>" data-unlimit="<%= unlimits[i] %>" data-pages="<%= pages %>" class="picker"></div>
        <% } %>
    </div>
    <div class="datepickerwrapper-footer">
        <button type="button" class="btn btn-default submit" bx-click="submit">确认</button>
        <a href="javascript: void(0);" bx-click="hide" class="btn btn-default cancel ml5">取消</a>
    </div>
    <% } %>
</div>