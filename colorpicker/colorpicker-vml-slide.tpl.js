/* global define */
define(function() {
    return (function(){/*
<div style="position: relative; width: 100%; height: 100%">
    <v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">
        <v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>
    </v:rect>
</div>
    */}).toString().split('\n').slice(1,-1).join('\n') + '\n'
})