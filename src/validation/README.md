# Validation

表单验证组件。

> 引用了 <http://parsleyjs.org/>。

```html
<form bx-name="components/validation"></form>
<div bx-name="components/validation"></div>
```

## 配置

无。

## 属性

属性名  | 类型    | 默认值 | 说明
:------ | :------ | :----- | :----------
parsley | Parsley | -      | <http://parsleyjs.org/>

## 方法

### .validate()

<http://parsleyjs.org/doc/index.html#usage-form>

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/validation')
instances.validate()
```

### .isValid()

<http://parsleyjs.org/doc/index.html#usage-form>

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/validation')
instances.isValid()
```

## 事件

无。

## 改变命名空间

Parsley 的默认空间是 `data-parsley-`，写起来有些冗长，可以通过配置 `data-parsley-namespace` 自定义更短的命名空间。

[JSFiddle Example](https://jsfiddle.net/4m4cynpm/)

```html
<script src="https://g-assets.daily.taobao.net/thx/brix-release/require-config-css.js"></script>

<form class="form" action="" 
    bx-name="components/validation" 
    data-parsley-namespace="va-" 
    va-validation-threshold="0" 
    va-focus="none">
    <input type="text" placeholder="标题字数在6至8个中文字符之间" 
        va-required 
        va-trigger="change keyup blur" 
        va-length="[3,8]">
    <br>
    <input type="text" class="form-control" placeholder="required" 
        va-trigger="change keyup" 
        va-required>
    <br>
    <input type="text" class="form-control" placeholder="type email" 
        va-trigger="change keyup" 
        va-required 
        va-type="email">
</form>
```

```js
require(['brix/loader'], function(Loader){
    Loader.boot()
})
```

## 示例

<a href="./examples.html" target="_blank">examples.html</a>

<iframe width="100%" height="500" src="./examples.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
