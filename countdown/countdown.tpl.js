/* global define */
define(function() {
    return (function(){/*
<div class="countdown">
    <span class="totalDays">00</span> 天
    <span class="hours"    >00</span> 时
    <span class="minutes"  >00</span> 分
    <span class="seconds"  >00</span> 秒
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})