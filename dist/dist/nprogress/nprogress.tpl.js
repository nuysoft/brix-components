/* global define */
define(function() {
    return (function(){/*
<div class="bar" role="bar"></div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})