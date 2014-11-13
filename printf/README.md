# printf

1. printf in JavaScript
2. Prettify JSONArray to table

> 请打开控制台查看。

### printf in JavaScript

    // syntax
    printf(format, args)
    format
        %-ms    - String
        %-m.nd  - Number (both integer and float)
        %-mj    - JSON

    // examples
    printf('%s %10s %-10s %10s', 1, 1, 12345, '1')
    printf('%s %10s %-10s %10s', 2, 12, 1234, '123')
    printf('%s %10s %-10s %10s', 3, 123, 123, '123456')
    printf('%s %10s %-10s %10s', 4, 1234, 12, '123456789')
    printf('%s %10s %-10s %10s', 5, 12345, 1, '1234567890')
    printf('%s %10.1d %-10s %10s', 6, 1.123, 123456, '1234567890123')
    printf('%s %3s %3s %3s', 7, 1234, 12345, 123456)

    // out
    1          1 12345               1
    2         12 1234              123
    3        123 123            123456
    4       1234 12          123456789
    5      12345 1          1234567890
    6        1.1 123456     1234567890123
    7 1234 12345 123456

<script type="text/javascript">
    require(['printf'], function(printf) {
        printf('%s %10s %-10s %10s', 1, 1, 12345, '1')
        printf('%s %10s %-10s %10s', 2, 12, 1234, '123')
        printf('%s %10s %-10s %10s', 3, 123, 123, '123456')
        printf('%s %10s %-10s %10s', 4, 1234, 12, '123456789')
        printf('%s %10s %-10s %10s', 5, 12345, 1, '1234567890')
        printf('%s %10.1d %-10s %10s', 6, 1.123, 123456, '1234567890123')
        printf('%s %3s %3s %3s', 7, 1234, 12345, 123456)

        var list = [
            { id: 1, foo: 'f', bar: 'barbarbarbar' },
            { id: 2, foo: 'foo', bar: 'barbar' },
            { id: 3, foo: 'foofoo', bar: 'bar' },
            { id: 4, foo: 'foofoofoofoo', bar: 'b', fb: 'foobar' }
        ]
        printf.table(list)
    })
</script>

### Prettify JSONArray to table
    
    // examples
    var list = [
        { id: 1, foo: 'f', bar: 'barbarbarbar' },
        { id: 2, foo: 'foo', bar: 'barbar' },
        { id: 3, foo: 'foofoo', bar: 'bar' },
        { id: 4, foo: 'foofoofoofoo', bar: 'b', fb: 'foobar' }
    ]
    printf.table(list)

    // out
    +----+--------------+--------------+-----------+
    | id | foo          | bar          | fb        |
    +----+--------------+--------------+-----------+
    | 1  | f            | barbarbarbar | undefined |
    | 2  | foo          | barbar       | undefined |
    | 3  | foofoo       | bar          | undefined |
    | 4  | foofoofoofoo | b            | foobar    |
    +----+--------------+--------------+-----------+

