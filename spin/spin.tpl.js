/* global define */
define(function() {
    return (function(){/*
<div class="spinner">
    <% if( type === 'rotating-plane' ) { %>
        <div class="rotating-plane"></div>
    <% } %>
    <% if( type === 'double-bounce' ) { %>
        <div class="double-bounce">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>    
        </div>
    <% } %>
    <% if( type === 'rectangle-bounce' ) { %>
        <div class="rectangle-bounce">
            <div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div>
        </div>
    <% } %>
    <% if( type === 'wandering-cubes' ) { %>
        <div class="wandering-cubes">
            <div class="cube1"></div><div class="cube2"></div>
        </div>
    <% } %>
    <% if( type === 'pulse' ) { %>
        <div class="pulse"></div>
    <% } %>
    <% if( type === 'chasing-dots' ) { %>
        <div class="chasing-dots">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    <% } %>
    <% if( type === 'three-bounce' ) { %>
        <div class="three-bounce">
            <div class="one"></div><div class="two"></div><div class="three"></div>
        </div>
    <% } %>
    <% if( type === 'circle-spinner' ) { %>
        <div class="circle-spinner">
            <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
        </div>
    <% } %>
</div>

    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})