# Validation

表单验证组件。{ .lead }

> 引用了 <http://parsleyjs.org/>。

### 示例 <small>Examples</small>

<style type="text/css">
    p.parsley-success, div.parsley-success {
        color: #468847;
        background-color: #DFF0D8;
        border: 1px solid #D6E9C6;
    }
    p.parsley-error, div.parsley-error {
        color: #B94A48;
        background-color: #F2DEDE;
        border: 1px solid #EED3D7;
    }
</style>

<script type="text/javascript">
    require(['parsley'], function(Parsley){
        window.ParsleyValidator.addValidator('gt', 
            function (value, requirement) {
                return parseFloat(value) > parseFloat(requirement)
            }, 32)
            .addMessage('en', 'gt', 'This value should be greater')
            .addMessage('zh_cn', 'gt', '输入值请大于 %s')
    })
</script>

<div class="bs-example">
    <div class="content">
        <form bx-name="components/validation" data-parsley-validation-threshold="0" data-parsley-focus="none" class="form" action="">
            <div class="form-group">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required                                class="form-control" placeholder="required">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-type="email"      class="form-control" placeholder="type email">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-type="number"     class="form-control" placeholder="type number">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-type="integer"    class="form-control" placeholder="type integer">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-type="digits"     class="form-control" placeholder="type digits">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-type="alphanum"   class="form-control" placeholder="type alphanum">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-type="url"        class="form-control" placeholder="type url">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-minlength="6"     class="form-control" placeholder="minlength 6">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-maxlength="6"     class="form-control" placeholder="maxlength 6">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-length="[6,10]"   class="form-control" placeholder="length [6,10]">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-min="6"           class="form-control" placeholder="min 6">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-max="6"           class="form-control" placeholder="max 6">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-range="[6,10]"    class="form-control" placeholder="range [6,10]">
                <input type="text" data-parsley-trigger="change keyup" data-parsley-required data-parsley-pattern="\d+" data-parsley-error-message="自定义消息" class="form-control" placeholder="pattern \d+">
            </div>
            <div>
                <div id="mincheckClassHandler">
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-mincheck="3" data-parsley-errors-container="#mincheckErrorsContiner" data-parsley-class-handler="#mincheckClassHandler" data-parsley-required name="mincheck"> mincheck1</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-mincheck="3" data-parsley-errors-container="#mincheckErrorsContiner" data-parsley-class-handler="#mincheckClassHandler" name="mincheck"> mincheck2</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-mincheck="3" data-parsley-errors-container="#mincheckErrorsContiner" data-parsley-class-handler="#mincheckClassHandler" name="mincheck"> mincheck3</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-mincheck="3" data-parsley-errors-container="#mincheckErrorsContiner" data-parsley-class-handler="#mincheckClassHandler" name="mincheck"> mincheck4</label>
                </div>
                <div id="mincheckErrorsContiner"></div>
            </div>
            <div>
                <div id="maxcheckClassHandler">
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-maxcheck="3" data-parsley-errors-container="#maxcheckErrorsContiner" data-parsley-class-handler="#maxcheckClassHandler" data-parsley-required name="maxcheck"> maxcheck1</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-maxcheck="3" data-parsley-errors-container="#maxcheckErrorsContiner" data-parsley-class-handler="#maxcheckClassHandler" name="maxcheck"> maxcheck2</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-maxcheck="3" data-parsley-errors-container="#maxcheckErrorsContiner" data-parsley-class-handler="#maxcheckClassHandler" name="maxcheck"> maxcheck3</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-maxcheck="3" data-parsley-errors-container="#maxcheckErrorsContiner" data-parsley-class-handler="#maxcheckClassHandler" name="maxcheck"> maxcheck4</label>
                </div>
                <div id="maxcheckErrorsContiner"></div>
            </div>
            <div>
                <div id="checkClassHandler">
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-check="[1, 3]" data-parsley-errors-container="#checkErrorsContiner" data-parsley-class-handler="#checkClassHandler" data-parsley-required name="check"> check1</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-check="[1, 3]" data-parsley-errors-container="#checkErrorsContiner" data-parsley-class-handler="#checkClassHandler" name="check"> check2</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-check="[1, 3]" data-parsley-errors-container="#checkErrorsContiner" data-parsley-class-handler="#checkClassHandler" name="check"> check3</label>
                    <label><input type="checkbox" data-parsley-trigger="change" data-parsley-check="[1, 3]" data-parsley-errors-container="#checkErrorsContiner" data-parsley-class-handler="#checkClassHandler" name="check"> check4</label>
                </div>
                <div id="checkErrorsContiner"></div>
            </div>
            <div>
                <input type="text" id="password1" data-parsley-trigger="change keyup" class="form-control" placeholder="equalto">
                <input type="text" id="password2" data-parsley-trigger="change keyup" data-parsley-equalto="#password1" class="form-control" placeholder="equalto">
            </div>
            <div>
                <input type="text" data-parsley-trigger="change keyup" data-parsley-gt="6" data-parsley-required class="form-control" placeholder="gt">
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

