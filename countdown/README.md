# Countdown

倒计时。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/countdown"></div>
        <div bx-name="components/countdown" bx-options="{
            expires: '2015-1-1'
        }"></div>
        <div bx-name="components/countdown" data-expires="2015-1-1"></div>
        <div bx-name="components/countdown" data-expires="2015-2-1 1:1:1"></div>
    </div>
</div>

### 配置 <small>Options</small>

Name | Type | Default | Description
:--- | :--- | :------ | :----------
expires | date or string | `new Date()` | 过期时间。

### 方法 <small>Methods</small>

#### .start()

开始倒计时。默认会自动开始。

```js
var Loader = require('brix/loader')
var instance = Loader.query('components/countdown')
instance.start()
```

#### .pause()

暂停倒计时。

```js
var Loader = require('brix/loader')
var instance = Loader.query('components/countdown')
instance.pause()
```

#### .resume()

恢复倒计时。

```js
var Loader = require('brix/loader')
var instance = Loader.query('components/countdown')
instance.stop()
```

#### .stop()

结束倒计时。

```js
var Loader = require('brix/loader')
var instance = Loader.query('components/countdown')
instance.stop()
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
start.countdown | 当计时器开始时触发。
update.countdown | 当计时器更新时触发。
pause.countdown | 当计时器暂停时触发。
resume.countdown | 当计时器恢复时触发。
complete.countdown | 当计时器结束后触发。

触发事件时，会给监听函数传入两个参数：`event` 和 `offset`。

`offset` 是一个对象，含有各种单位的剩余时间：

```json
{
    "total": 0,
    "seconds": 0,
    "minutes": 0,
    "hours": 0,
    "days": 0,
    "totalDays": 0,
    "weeks": 0,
    "months": 0,
    "years": 0
}
```

> 其中，`total` 的单位是秒。

```js
var Loader = require('brix/loader')
var instance = Loader.query('components/countdown')
var events = 'start.countdown update.countdown pause.countdown resume.countdown complete.countdown'
instance.on(events, function(event, offset) {
    console.log(event.type, offset)
})
```

> 因为 Countdown 每次更新剩余时间，都会触发 `update.countdown` 事件，所以上面的代码会在控制台造成海量的输出。