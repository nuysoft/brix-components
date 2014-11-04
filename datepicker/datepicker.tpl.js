/* global define */
define(function() {
    return (function(){/*
<div class="datepicker-container">
    <div class="yearpicker picker-group">
        <div class="picker-header">
            <button class="btn btn-default minus" type="button"><span class="glyphicon glyphicon-chevron-left"></span></button>
            <h4>? - ?</h4>
            <button class="btn btn-default plus" type="button"><span class="glyphicon glyphicon-chevron-right"></span></button>
        </div>
        <div class="picker-body picker-selectable clearfix">
            <!-- <span data-value="2014" class="active">2014</span> -->
            <!-- <span data-value="2014">2014</span> -->
        </div>
    </div>
    <div class="monthpicker picker-group">
        <div class="picker-header">
            <button class="btn btn-default minus" type="button"><span class="glyphicon glyphicon-chevron-left"></span></button>
            <h4>?</h4>
            <button class="btn btn-default plus" type="button"><span class="glyphicon glyphicon-chevron-right"></span></button>
        </div>
        <div class="picker-body picker-selectable clearfix">
            <!-- <span data-value="1" class="active">Jan</span -->
            <!-- <span data-value="1">Jan</span -->
        </div>
    </div>
    <div class="datepicker picker-group">
        <div class="picker-header">
            <button class="btn btn-default minus" type="button"><span class="glyphicon glyphicon-step-backward"></span></button>
            <h4>2014-09</h4>
            <button class="btn btn-default plus" type="button"><span class="glyphicon glyphicon-step-forward"></span></button>
        </div>
        <div class="picker-body">
            <div class="datepicker-body-description clearfix">
                <span class="disabled">Sun</span><span class="disabled">Mon</span><span class="disabled">Tue</span><span class="disabled">Wed</span><span class="disabled">Thur</span><span class="disabled">Fri</span><span class="disabled">Sat</span>
            </div>
            <div class="datepicker-body-value picker-selectable clearfix">
                <!-- <span class="inactive"></span> -->
                <!-- <span data-value="1" class="active">01</span> -->
                <!-- <span data-value="1">01</span> -->
            </div>
        </div>
    </div>
    <div class="timepicker picker-group clearfix">
        <div class="timepicker-group">
            <input class="form-control" type="text" tabindex="<%=clientId%>">
            <button type="button" class="btn btn-default time-minus"><span class="glyphicon glyphicon-minus"></span></button>
            <button type="button" class="btn btn-default time-plus"><span class="glyphicon glyphicon-plus"></span></button>
        </div>
        <span class="timepicker-spliter">:</span>
        <div class="timepicker-group">
        	<input class="form-control" type="text"  tabindex="<%=clientId%>">
        	<button type="button" class="btn btn-default time-minus"><span class="glyphicon glyphicon-minus"></span></button>
        	<button type="button" class="btn btn-default time-plus"><span class="glyphicon glyphicon-plus"></span></button></div>
        <span class="timepicker-spliter">:</span>
        <div class="timepicker-group">
        	<input class="form-control" type="text" tabindex="<%=clientId%>">
        	<button type="button" class="btn btn-default time-minus"><span class="glyphicon glyphicon-minus"></span></button>
        	<button type="button" class="btn btn-default time-plus"><span class="glyphicon glyphicon-plus"></span></button></div>
    </div>
</div>



    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})