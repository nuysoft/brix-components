/* global define */
define(function() {
    return (function(){/*
<div class="popover <%= placement %>">
    <div class="arrow"></div>
    <div class="popover-title <%= title ? '' : 'hide' %>"><%= title %></div>
    <div class="popover-content"><%= content %></div>
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})