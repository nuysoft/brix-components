# HourPicker

<div class="bs-example">
    <div class="content">
        <div bx-name="components/hourpicker"> </div>
    </div>
</div>

<pre>
var hourpicker = Loader.query('components/hourpicker')
hourpicker.val(1, [0, 1, 2, 3, 5, 7, 9, 23])
hourpicker.val({
    1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    2: [0, 1, 2, 3, 4],
    3: [0, 2, 4, 6, 8],
    4: [1, 3, 5, 7, 9],
    5: [10, 11, 12, 13, 14, 15],
    6: [10, 11, 12],
    0: [10, 11, 12]
})
</pre>