# Ellipsis

为多行文本的溢出部分增加省略号。{ .lead }

### 示例 <small>Examples</small>

<style type="text/css">
    .box {
        width: 125px;
        height: 4.5em;
        border: 1px solid #ccc;
        padding: 0.5em 1em;
        margin-right: 10px;
        overflow: hidden;
        float: left;
    }
    .box-responsive {
        width: 40%;
    }
</style>

<div class="bs-example">
    <div class="content clearfix">
        <div bx-name="components/ellipsis" class="box">
            No ellip. Too short.
        </div>
        <div bx-name="components/ellipsis" class="box">
            不需要省略号，太短了。
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content clearfix">
        <div bx-name="components/ellipsis" data-lines="1" class="box">
          Forcing one line regardless
        </div>
        <div bx-name="components/ellipsis" data-lines="1" class="box">
            强制只显示一行。
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content clearfix">
        <div bx-name="components/ellipsis" data-lines="2" class="box">
            Forcing two lines of text regardless of overflow
        </div>
        <div bx-name="components/ellipsis" data-lines="2" class="box">
            强制只显示两行，不管什么情况。
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content clearfix">
        <div bx-name="components/ellipsis" class="box">
          Trying to ellipsis any overflowed content. The quick brown fox jumped over the lazy dogs. The quick brown fox jumped over the lazy dogs.
        </div>
        <div bx-name="components/ellipsis" class="box">
            为溢出内容自动增加省略号。
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content clearfix">
        <div bx-name="components/ellipsis" class="box box-responsive">
          This is a responsive box that will update it's ellipsis when the screen resizes. The quick brown fox jumped over the lazy dogs. The quick brown fox jumped over the lazy dogs.
        </div>
    </div>
</div>


