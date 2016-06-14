/* global define */
define(function() {
    return "<span class=\"switch \n" +
        "	<%= checked ? 'switch-checked' : '' %> \n" +
        "	<%= disabled ? 'switch-disabled' : '' %>\n" +
        "	<%= size ? 'switch-' + size : '' %>\n" +
        "	\" bx-click=\"toggle\">\n" +
        "	<small></small>\n" +
        "</span>"
})