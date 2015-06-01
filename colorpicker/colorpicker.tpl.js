/* global define */
define(function() {
    return (function(){/*
<div class="colorpicker">
    <div class="colorpicker-header clearfix">
        <ul>
            <% for(var i = 0; i < colors.length; i++) { %>
            <li value="<%=colors[i]%>" style="background-color:<%=colors[i]%>;" bx-click="pickQuickColor(<%=colors[i]%>)"></li>
            <% } %>
        </ul>
    </div>
    <div class="colorpicker-middle clearfix">
        <i class="uxicon arrow <%= min ? '' : 'arrow-up' %>">
            <%= min ? '&#405' : '&#404' %>
        </i>
    </div>
    <div class="colorpicker-body clearfix <%= min ? 'colorpicker-body-min' : '' %>">
        <div class="picker-wrapper">
            <div class="picker" bx-click="pickPaletteColor()"></div>
            <i class="uxicon picker-indicator" bx-mousedown="dragPickerIndicator()">&#470</i>
        </div>
        <div class="slide-wrapper">
            <div class="slide" bx-click="pickSlideColor()"></div>
            <i class="uxicon slide-indicator" bx-mousedown="dragSlideIndicator">&#461</i>
        </div>
    </div>
    <div class="colorpicker-footer clearfix">
        <span class="bg" style="background-color: <%=color%>"></span>
        <input type="text" class="form-control" value="<%=color%>" bx-keyup="inputColor" bx-blur="finishInputColor">
        <a class="btn btn-default" bx-click="submit">确定</a>
    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})