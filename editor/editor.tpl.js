/* global define */
define(function() {
    return (function(){/*
<div class="editor-wrapper">
    <div class="toolbar">
        <div class="btn-group">
            <a class="btn btn-default" data-command="bold"          title="Bold (Ctrl/Cmd+B)">      <i class="fa fa-bold"></i>          </a>
            <a class="btn btn-default" data-command="italic"        title="Italic (Ctrl/Cmd+I)">    <i class="fa fa-italic"></i>        </a>
            <a class="btn btn-default" data-command="strikethrough" title="Strikethrough">          <i class="fa fa-strikethrough"></i> </a>
            <a class="btn btn-default" data-command="underline"     title="Underline (Ctrl/Cmd+U)"> <i class="fa fa-underline"></i>     </a>
        </div>
        <div class="btn-group">
            <a class="btn btn-default" data-command="insertunorderedlist" title="Bullet list">               <i class="fa fa-list-ul"></i> </a>
            <a class="btn btn-default" data-command="insertorderedlist"   title="Number list">               <i class="fa fa-list-ol"></i> </a>
            <a class="btn btn-default" data-command="outdent"             title="Reduce indent (Shift+Tab)"> <i class="fa fa-dedent"></i>  </a>
            <a class="btn btn-default" data-command="indent"              title="Indent (Tab)">              <i class="fa fa-indent"></i>  </a>
        </div>
        <div class="btn-group">
            <a class="btn btn-default" data-command="justifyleft"   title="Align Left (Ctrl/Cmd+L)">  <i class="fa fa-align-left"></i>    </a>
            <a class="btn btn-default" data-command="justifycenter" title="Center (Ctrl/Cmd+E)">      <i class="fa fa-align-center"></i>  </a>
            <a class="btn btn-default" data-command="justifyright"  title="Align Right (Ctrl/Cmd+R)"> <i class="fa fa-align-right"></i>   </a>
            <a class="btn btn-default" data-command="justifyfull"   title="Justify (Ctrl/Cmd+J)">     <i class="fa fa-align-justify"></i> </a>
        </div>
    </div>
    <div class="editor mousetrap" contenteditable="true">
        <div><b>Bold (Ctrl/Cmd+B)</b></div><div><i>Italic (Ctrl/Cmd+I)</i></div><div><strike>Strikethrough</strike></div><div><u>Underline (Ctrl/Cmd+U)</u></div><div><ul><li><span style="line-height: 1.42857143;">Bullet list</span><br></li></ul></div><div><ol><li><span style="line-height: 1.42857143;">Number list</span><br></li></ol></div><blockquote style="margin: 0 0 0 40px; border: none; padding: 0px;"><div>Reduce indent (Shift+Tab)</div></blockquote><div>Indent (Tab)</div><div>Align Left (Ctrl/Cmd+L)</div><div style="text-align: center;">Center (Ctrl/Cmd+E)</div><div style="text-align: right;">Align Right (Ctrl/Cmd+R)</div><div style="text-align: justify;">Justify (Ctrl/Cmd+J)</div>
    </div>
</div>
    */}).toString().split("\n").slice(1,-1).join("\n")
})