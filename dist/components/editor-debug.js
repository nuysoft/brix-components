(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("mousetrap"), require("brix/base"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "mousetrap", "brix/base"], factory);
	else if(typeof exports === 'object')
		exports["components/editor"] = factory(require("jquery"), require("underscore"), require("mousetrap"), require("brix/base"));
	else
		root["components/editor"] = factory(root["jquery"], root["underscore"], root["mousetrap"], root["brix/base"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, window, document, FileReader, console */
	/*
	    http://mindmup.github.io/bootstrap-wysiwyg/
	    http://fontawesome.io/

	    TODO
	        line number
	        options bar
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2), __webpack_require__(3), __webpack_require__(4),
	        __webpack_require__(5),
	        __webpack_require__(6),
	        !(function webpackMissingModule() { var e = new Error("Cannot find module \"css!./editor.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
	        !(function webpackMissingModule() { var e = new Error("Cannot find module \"css!fontawesome/css/font-awesome.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        $, _, Mousetrap,
	        Brix,
	        template
	    ) {
	        /*
	            ### 数据
	                {}
	            ### 选项
	                data template
	            ### 属性
	                element moduleId clientId parentClientId childClientIds data template
	            ### 方法
	                .render()
	            ### 事件
	                ready destroyed
	        */
	        function Editor() {}

	        _.extend(Editor.prototype, Brix.prototype, {
	            options: {},
	            render: function() {
	                this.data = this.data || _.extend({}, this.options)

	                var $element = this.$element = $(this.element)
	                var html = _.template(template)(this.data)
	                $element.append(html)

	                var $toolbar = this.$toolbar = $element.find('.btn-toolbar')
	                var $editor = this.$editor = $element.find('.editor')

	                bindHotKeys($editor[0])
	                bindToolbar($editor[0])
	                initFileDrops()

	                $editor.attr('contenteditable', true)
	                    .on('mouseup keyup mouseout', function() {
	                        saveSelection()
	                        updateToolbar($toolbar)
	                    })
	                return this
	            },
	            clean: function() {
	                var html = this.$editor.html()
	                var rwhite = /(<br>|\s|<div><br><\/div>|&nbsp;)*$/
	                this.$editor.html(
	                    html && html.replace(rwhite, '')
	                )
	                return this
	            }
	        })

	        var HOTKEYS = {
	            'ctrl+b meta+b': 'bold',
	            'ctrl+i meta+i': 'italic',
	            'ctrl+u meta+u': 'underline',
	            'ctrl+z meta+z': 'undo',
	            'ctrl+y meta+y meta+shift+z': 'redo',
	            'ctrl+l meta+l': 'justifyleft',
	            'ctrl+r meta+r': 'justifyright',
	            'ctrl+e meta+e': 'justifycenter',
	            'ctrl+j meta+j': 'justifyfull',
	            'shift+tab': 'outdent',
	            'tab': 'indent'
	        }

	        var selectedRange

	        function readFileAsDataUrl(file, callback) {
	            var reader = new FileReader()
	            reader.onload = function(event) {
	                if (callback) callback(event.target.result)
	            };
	            reader.onerror = reader.onprogress = function() {
	                console.log(arguments)
	            }
	            reader.readAsDataURL(file)
	        }

	        function updateToolbar($toolbar) {
	            $toolbar = $('.toolbar')
	            _.each($toolbar.find('[data-command]'), function(item /*, index*/ ) {
	                var $item = $(item)
	                var command = $item.data('command')
	                if (document.queryCommandState(command)) {
	                    $item.addClass('btn-primary')
	                } else {
	                    $item.removeClass('btn-primary')
	                }
	            })
	        }

	        function execCommand(commandWithArgs, valueArg) {
	            var commandArr = commandWithArgs.split(' '),
	                command = commandArr.shift(),
	                args = commandArr.join(' ') + (valueArg || '');
	            document.execCommand(command, 0, args);
	            updateToolbar()
	        }

	        function bindHotKeys(editor) {
	            _.each(HOTKEYS, function(command, hotKey) {
	                Mousetrap.bind(
	                    hotKey.split(' '),
	                    function(event) {
	                        if (event.target !== editor) return
	                        event = new $.Event(event)
	                        event.preventDefault()
	                        event.stopPropagation()
	                        execCommand(command)
	                    }
	                )
	            })
	        }

	        function getCurrentRange() {
	            var sel = window.getSelection();
	            if (sel.getRangeAt && sel.rangeCount) {
	                return sel.getRangeAt(0);
	            }
	        }

	        function saveSelection() {
	            selectedRange = getCurrentRange();
	        }

	        function restoreSelection() {
	            var selection = window.getSelection();
	            if (selectedRange) {
	                try {
	                    selection.removeAllRanges();
	                } catch (ex) {
	                    document.body.createTextRange().select();
	                    document.selection.empty();
	                }

	                selection.addRange(selectedRange);
	            }
	        }

	        function insertFiles(files) {
	            var $editor = $('.editor')
	            $editor.focus();
	            _.each(files, function(file /*, index*/ ) {
	                if (/^image\//.test(file.type)) {
	                    readFileAsDataUrl(file, function(dataUrl) {
	                        execCommand('insertimage', dataUrl)
	                    })
	                } else {
	                    console.log('unsupported file type', file.type)
	                }
	            })
	        }

	        // function markSelection(input, color) {
	        //     restoreSelection();
	        //     if (document.queryCommandSupported('hiliteColor')) {
	        //         document.execCommand('hiliteColor', 0, color || 'transparent');
	        //     }
	        //     saveSelection();
	        //     input.data(options.selectionMarker, color);
	        // }

	        function bindToolbar($editor, $toolbar) {
	            $editor = $('.editor')
	            $toolbar = $('.toolbar')
	            _.each($toolbar.find('[data-command]'), function(item /*, index*/ ) {
	                $(item).on('click', function() {
	                    restoreSelection()
	                    $editor.focus()
	                    execCommand($(this).data('command'))
	                    saveSelection()
	                })
	            })
	        }

	        function initFileDrops() {
	            var $editor = $('.editor')
	            $editor.on('dragenter dragover', false)
	                .on('drop', function(e) {
	                    var dataTransfer = e.originalEvent.dataTransfer
	                    e.stopPropagation()
	                    e.preventDefault()
	                    if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
	                        insertFiles(dataTransfer.files);
	                    }
	                });
	        }

	        return Editor
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return "<div class=\"editor-wrapper\">\n" +
	        "    <div class=\"toolbar\">\n" +
	        "        <div class=\"btn-group\">\n" +
	        "            <a class=\"btn btn-default\" data-command=\"bold\"          title=\"Bold (Ctrl/Cmd+B)\">      <i class=\"fa fa-bold\"></i>          </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"italic\"        title=\"Italic (Ctrl/Cmd+I)\">    <i class=\"fa fa-italic\"></i>        </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"strikethrough\" title=\"Strikethrough\">          <i class=\"fa fa-strikethrough\"></i> </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"underline\"     title=\"Underline (Ctrl/Cmd+U)\"> <i class=\"fa fa-underline\"></i>     </a>\n" +
	        "        </div>\n" +
	        "        <div class=\"btn-group\">\n" +
	        "            <a class=\"btn btn-default\" data-command=\"insertunorderedlist\" title=\"Bullet list\">               <i class=\"fa fa-list-ul\"></i> </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"insertorderedlist\"   title=\"Number list\">               <i class=\"fa fa-list-ol\"></i> </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"outdent\"             title=\"Reduce indent (Shift+Tab)\"> <i class=\"fa fa-dedent\"></i>  </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"indent\"              title=\"Indent (Tab)\">              <i class=\"fa fa-indent\"></i>  </a>\n" +
	        "        </div>\n" +
	        "        <div class=\"btn-group\">\n" +
	        "            <a class=\"btn btn-default\" data-command=\"justifyleft\"   title=\"Align Left (Ctrl/Cmd+L)\">  <i class=\"fa fa-align-left\"></i>    </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"justifycenter\" title=\"Center (Ctrl/Cmd+E)\">      <i class=\"fa fa-align-center\"></i>  </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"justifyright\"  title=\"Align Right (Ctrl/Cmd+R)\"> <i class=\"fa fa-align-right\"></i>   </a>\n" +
	        "            <a class=\"btn btn-default\" data-command=\"justifyfull\"   title=\"Justify (Ctrl/Cmd+J)\">     <i class=\"fa fa-align-justify\"></i> </a>\n" +
	        "        </div>\n" +
	        "    </div>\n" +
	        "    <div class=\"editor mousetrap\" contenteditable=\"true\">\n" +
	        "        <div><b>Bold (Ctrl/Cmd+B)</b></div><div><i>Italic (Ctrl/Cmd+I)</i></div><div><strike>Strikethrough</strike></div><div><u>Underline (Ctrl/Cmd+U)</u></div><div><ul><li><span style=\"line-height: 1.42857143;\">Bullet list</span><br></li></ul></div><div><ol><li><span style=\"line-height: 1.42857143;\">Number list</span><br></li></ol></div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div>Reduce indent (Shift+Tab)</div></blockquote><div>Indent (Tab)</div><div>Align Left (Ctrl/Cmd+L)</div><div style=\"text-align: center;\">Center (Ctrl/Cmd+E)</div><div style=\"text-align: right;\">Align Right (Ctrl/Cmd+R)</div><div style=\"text-align: justify;\">Justify (Ctrl/Cmd+J)</div>\n" +
	        "    </div>\n" +
	        "</div>"
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;