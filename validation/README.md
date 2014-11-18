# Validation

表单验证组件。{ .lead }

> 引用了 <http://parsleyjs.org/>。

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <form bx-name="components/validation" data-parsley-validate class="form" action="">
            <div class="form-group">
                <label>Full Name \* :</label>
                <input type="text" class="form-control" placeholder="Full Name" data-parsley-trigger="change" required>
            </div>
            <div class="form-group">
                <label>Email \* :</label>
                <input type="email" class="form-control" placeholder="Email" data-parsley-trigger="change" required>
            </div>
            <div class="form-group">
                <label>Gender * :</label>
                <p>
                    M: <input type="radio" name="gender" value="M" required>
                    F: <input type="radio" name="gender" value="F">
                </p>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
</div>

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/validation')
instances.validate()
```

### 配置 <small>Options</small>

无。

### 属性 <small>Properties</small>

Name | Type | Default | Description
:--- | :--- | :------ | :----------
parsley | Parsley | - | <http://parsleyjs.org/>

### 方法 <small>Methods</small>

####  .validate()

<http://parsleyjs.org/doc/index.html#usage-form>

####  .isValid()

<http://parsleyjs.org/doc/index.html#usage-form>

### 事件 <small>Events</small>

无。

