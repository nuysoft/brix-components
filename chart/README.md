# Chart

图表。{ .lead }

> 来自 [Chart.js](https://github.com/nnnick/Chart.js)。

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/chart" data-type="Line" data-data="{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }, {
                label: 'My Second dataset',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 86, 27, 90]
            }]
        }"></div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chart" data-type="Bar" data-data="{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0.5)',
                    strokeColor: 'rgba(220,220,220,0.8)',
                    highlightFill: 'rgba(220,220,220,0.75)',
                    highlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    fillColor: 'rgba(151,187,205,0.5)',
                    strokeColor: 'rgba(151,187,205,0.8)',
                    highlightFill: 'rgba(151,187,205,0.75)',
                    highlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }"></div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chart" data-type="Radar" data-data="{
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0.2)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    fillColor: 'rgba(151,187,205,0.2)',
                    strokeColor: 'rgba(151,187,205,1)',
                    pointColor: 'rgba(151,187,205,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        }"></div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chart" data-type="PolarArea" data-data="[
            {
                value: 300,
                color:'#F7464A',
                highlight: '#FF5A5E',
                label: 'Red'
            },
            {
                value: 50,
                color: '#46BFBD',
                highlight: '#5AD3D1',
                label: 'Green'
            },
            {
                value: 100,
                color: '#FDB45C',
                highlight: '#FFC870',
                label: 'Yellow'
            },
            {
                value: 40,
                color: '#949FB1',
                highlight: '#A8B3C5',
                label: 'Grey'
            },
            {
                value: 120,
                color: '#4D5360',
                highlight: '#616774',
                label: 'Dark Grey'
            }

        ]"></div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chart" data-type="Pie" data-data="[
            {
                value: 300,
                color: '#F7464A',
                highlight: '#FF5A5E',
                label: 'Red'
            },
            {
                value: 50,
                color: '#46BFBD',
                highlight: '#5AD3D1',
                label: 'Green'
            },
            {
                value: 100,
                color: '#FDB45C',
                highlight: '#FFC870',
                label: 'Yellow'
            }
        ]"></div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chart" data-type="Doughnut" data-data="[
            {
                value: 300,
                color: '#F7464A',
                highlight: '#FF5A5E',
                label: 'Red'
            },
            {
                value: 50,
                color: '#46BFBD',
                highlight: '#5AD3D1',
                label: 'Green'
            },
            {
                value: 100,
                color: '#FDB45C',
                highlight: '#FFC870',
                label: 'Yellow'
            }
        ]"></div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chart" data-type="Doughnut">
            [
                {
                    value: 300,
                    color: '#F7464A',
                    highlight: '#FF5A5E',
                    label: 'Red'
                },
                {
                    value: 50,
                    color: '#46BFBD',
                    highlight: '#5AD3D1',
                    label: 'Green'
                },
                {
                    value: 100,
                    color: '#FDB45C',
                    highlight: '#FFC870',
                    label: 'Yellow'
                }
            ]
        </div>
    </div>
</div>

### 配置 <small>Options</small>

Name | Type | Default | Description
:--- | :--- | :------ | :----------
type | string | 'line' | 指定图表类型。可选值有：折线图 `line`、柱状图 `bar`、雷达图 `radar`、极区图 `polararea`、饼图 `pie`、环形图 `doughnut`。
width | number | 自适应 | 指定图表的宽度。默认为图表所在容器的宽度。
height | number | `400` | 指定图标的高度。
data | object or array | - | 参见 <http://www.chartjs.org/docs/>。