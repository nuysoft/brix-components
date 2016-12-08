# Uploader

上传组件。

```html
<form>
    <button bx-name="components/uploader" 
        data-action="api/upload.json" 
        data-name="foo" 
        type="button" 
        class="btn btn-default">
        选择文件
    </button>
</form>
```

> **注意：** Uploader 组件需要放入一个 `form` 元素中。

## 配置

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

配置项    | 类型    | 默认值     | 说明
:---      | :------ | :--------- | :----------
action    | string  | `''`       | 指定接收文件的 URL。
name      | string  | `'file'`   | 指定文件域的名称。
transport | string  | `'iframe'` | 指定上传文件的方式，可选值有 `'iframe'`、`'xhr'`。
multiple  | boolean | `true`     | 是否允许多选。
accept    | stirng  | `''`       | 指定服务端可接受的文件类型，例如 `'.jpg,.png'`、`'image/*'`。详细的合法值请参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes)。

## 方法

### Uploader.parseJSONResponse( response, callback )

将响应内容解析成 JSON 对象。

## 事件

事件类型          | 说明
:---------------- | :----------
start.uploader    | 开始上传，如果返回 false，则终止上传。监听函数接受 2 个参数：jQuery 事件对象 `event` 和上传的文件数组 `files` 。
progress.uploader | 上传进度。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和一个 [ProgressEvent] 事件对象 `state`。
success.uploader  | 上传成功。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和响应内容 `response`。
error.uploader    | 上传失败。监听函数接受 3 个参数：jQuery 事件对象 `event`、上传的文件数组 `files` 和错误描述 `reason`。
complete.uploader | 上传完成。监听函数接受 2 个参数：jQuery 事件对象 `event` 和上传的文件数组 `files` 。

> 如果在事件 `start.uploader` 的监听函数中调用了 `event.preventDefault()`，则立即终止上传。

> 如果通过 iframe 上传文件，则不会触发事件 `progress.uploader`。

[ProgressEvent]: https://xhr.spec.whatwg.org/#progressevent

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/uploader')
instances.on('start.uploader', function(event, files) {
    console.log(event.type, event.namespace, event.components, files)
})
instances.on('progress.uploader', function(event, files, state) {
    console.log(event.type, event.namespace, files, state)
})
instances.on('success.uploader', function(event, files, response) {
    console.log(event.type, event.namespace, files, response)
})
instances.on('error.uploader', function(event, files, reason) {
    console.log(event.type, event.namespace, files, reason)
})
instances.on('complete.uploader', function(event, files) {
    console.log(event.type, event.namespace, files)
})
```

## 示例

<a href="./examples.html" target="_blank">examples.html</a>

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
