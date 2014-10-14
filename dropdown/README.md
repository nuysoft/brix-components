# Dropdown

下拉框组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <select bx-name="components/dropdown">
            <option value="1">Action</option>
            <option value="2">Another action</option>
            <option value="3">Something else here</option>
        </select>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <select bx-name="components/dropdown" bx-options="{
            data: [
                { label: 'Action', value: 1 },
                { label: 'Another action', value: 2, selected: true },
                { label: 'Something else here', value: 3 }
            ]
        }"></select>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <select bx-name="components/dropdown" data-data="[
            { label: 'Action', value: 1 },
            { label: 'Another action', value: 2, selected: true },
            { label: 'Something else here', value: 3 }
        ]"></select>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <select bx-name="components/dropdown">
            <optgroup label="optgroup 1">
                <option value="1">Action</option>
            </optgroup>
            <optgroup label="optgroup 2">
                <option value="2">Another action</option>
            </optgroup>
            <optgroup label="optgroup 3">
                <option value="3" selected>Something else here</option>
            </optgroup>
        </select>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <select bx-name="components/dropdown">
            <optgroup label="optgroup 1">
                <option value="1">Action</option>
            </optgroup>
            <optgroup label="optgroup 2">
                <option value="2">Another action</option>
            </optgroup>
            <option class="divider"></option>
            <optgroup label="optgroup 3">
                <option value="3" selected>Something else here</option>
            </optgroup>
        </select>
    </div>
</div>
