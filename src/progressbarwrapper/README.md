# ProgressBarWrapper

Lorem ipsum

### 示例 <small>Examples</small>

<style type="text/css">
	.w200 { width: 200px; }
</style>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/progressbarwrapper" data-progress="0.1"></div>
        <div bx-name="components/progressbarwrapper" data-progress="0.5"></div>
        <div bx-name="components/progressbarwrapper" data-progress="0.7"></div>
        <div bx-name="components/progressbarwrapper" data-progress="1"></div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
    	<div bx-name="components/progressbarwrapper" data-type="line" data-progress="0.1"></div>
        <div bx-name="components/progressbarwrapper" data-type="line" data-progress="0.5"></div>
        <div bx-name="components/progressbarwrapper" data-type="line" data-progress="0.7"></div>
        <div bx-name="components/progressbarwrapper" data-type="line" data-progress="1"></div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/progressbarwrapper" data-type="circle" data-progress="0.1" class="w200"></div>
        <div bx-name="components/progressbarwrapper" data-type="circle" data-progress="0.5" class="w200"></div>
        <div bx-name="components/progressbarwrapper" data-type="circle" data-progress="0.7" class="w200"></div>
        <div bx-name="components/progressbarwrapper" data-type="circle" data-progress="1" class="w200"></div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/progressbarwrapper" data-type="square" data-progress="0.1" class="w200"></div>
        <div bx-name="components/progressbarwrapper" data-type="square" data-progress="0.5" class="w200"></div>
        <div bx-name="components/progressbarwrapper" data-type="square" data-progress="0.7" class="w200"></div>
        <div bx-name="components/progressbarwrapper" data-type="square" data-progress="1" class="w200"></div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <h4>示例：海淘广告效果预估</h4>
        <div class="row">
            <div class="col-xs-4">
                <div id="haitao"></div>
            </div>
            <div class="col-xs-4">
                <div id="haitao2"></div>
            </div>
            <div class="col-xs-4">
                <div id="haitao3"></div>
            </div>
        </div>
    </div>
</div>
<style type="text/css">
    .bs-example .progressbar-text {
        text-align: center;
    }
    .bs-example .progressbar-text .glyphicon {
        font-size: 28px;
        color: #999;
    }
    .bs-example .progressbar-text .label {
        color: #999;
    }
    .bs-example .progressbar-text .number {
        font-weight: bold;
        color: rgb(41,123,244);
    }
</style>
<script type="text/javascript">
    require(['progressbar'], function(ProgressBar) {
        var options = {
            // color: "#FCB03C",
            color: 'rgb(41,123,244)',
            trailColor: "rgb(221,221,221)",
            text: {
                value: '-'
            }
        }
        var shape = new ProgressBar.Circle('#haitao', options)
        shape.animate(0.9)
        $(shape.text).empty()
            .append('<p class="glyphicon glyphicon-user"></p>')
            .append('<p class="label">覆盖人群数预估</p>')
            .append('<p class="number"><span style="color: #999;">约</span> 123,456,789</p>')
        window.shape = shape

        var shape2 = new ProgressBar.Circle('#haitao2', options)
        shape2.animate(0.7)
        $(shape2.text).empty()
            .append('<p class="glyphicon glyphicon-user"></p>')
            .append('<p class="label">智能流量预估</p>')
            .append('<p class="number"><span style="color: #999;">约</span> 123,456,789</p>')

        var shape3 = new ProgressBar.Circle('#haitao3', options)
        shape3.animate(0.5)
        $(shape3.text).empty()
            .append('<p class="glyphicon glyphicon-user"></p>')
            .append('<p class="label">实际流量预估</p>')
            .append('<p class="number"><span style="color: #999;">约</span> 123,456,789</p>')
    })
</script>
