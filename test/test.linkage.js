/* global chai, describe, it, before, beforeEach, afterEach */
/* global Loader: true, $: true, _: true, heredoc: true, Random: true, Linkage: true, $containers: true */
describe('Linkage', function() {
    this.timeout(5000)

    var expect = chai.expect
    var TPL

    before(function(done) {
        require(
            [
                'brix/loader', 'jquery', 'underscore', 'mock',
                'components/table/linkage'
            ],
            function() {
                Loader = arguments[0]
                $ = arguments[1]
                _ = arguments[2]
                heredoc = arguments[3].heredoc
                Random = arguments[3].Random
                Linkage = arguments[4]
                $containers = $('div.container')

                TPL = heredoc(function() {
                    /*
                    <label>
                        <input id="<%= id %>"
                            name="<%= { checkbox: name, radio: pname }[type] %>"
                            type="<%= type %>"
                            value="<%= value %>"
                            <%= checked ? 'checked' : '' %>
                            <%= disabled ? 'disabled' : '' %>
                            data-linkage-name="<%= id %>"
                            data-linkage-parent-name="<%= pid %>">
                        #<%= id %> <%= name %>
                    </label>
                    <% if( children.length ) { %>
                    <ul>
                        <% for(var i = 0, item; item = children[i]; i++ ) { %>
                            <li>
                                <%= item.html() %>
                            </li>
                        <% } %>
                    </ul>
                    <% } %>
                     */
                })
                TPL = _.template(TPL)

                done()
            }
        )
    })

    function genNode(id, name, type, checked, disabled, children) {
        _.each(children, function(item /*, index*/ ) {
            item.pid = id
            item.pname = name
        })
        return {
            id: id,
            pid: undefined,
            name: name,
            pname: undefined,
            value: id,
            type: type,
            checked: !!checked,
            disabled: !!disabled,
            children: children || [],
            html: function() {
                return TPL(this)
            }
        }
    }

    genNode.checkbox = function(id, checked, disabled, children) {
        return genNode(id, Random.cword(5), 'checkbox', checked, disabled, children)
    }

    genNode.radio = function(id, checked, disabled, children) {
        return genNode(id, Random.cword(5), 'radio', checked, disabled, children)
    }

    function genData(type) {
        return genNode[type]('ROOT', false, false, [
            genNode[type]('1', false, false, [
                genNode[type]('1-1', false, false, [
                    genNode[type]('1-1-1', false, false, []), genNode[type]('1-1-2', false, false, []), genNode[type]('1-1-3', false, false, [])
                ]),
                genNode[type]('1-2', false, false, [
                    genNode[type]('1-2-1', false, false, []), genNode[type]('1-2-2', false, false, []), genNode[type]('1-2-3', false, false, [])
                ]),
                genNode[type]('1-3', false, false, [
                    genNode[type]('1-3-1', false, false, []), genNode[type]('1-3-2', false, false, []), genNode[type]('1-3-3', false, false, [])
                ])
            ]),
            genNode[type]('2', false, false, [
                genNode[type]('2-1', false, false, [
                    genNode[type]('2-1-1', false, false, []), genNode[type]('2-1-2', false, false, []), genNode[type]('2-1-3', false, false, [])
                ]),
                genNode[type]('2-2', false, false, [
                    genNode[type]('2-2-1', false, false, []), genNode[type]('2-2-2', false, false, []), genNode[type]('2-2-3', false, false, [])
                ]),
                genNode[type]('2-3', false, false, [
                    genNode[type]('2-3-1', false, false, []), genNode[type]('2-3-2', false, false, []), genNode[type]('2-3-3', false, false, [])
                ])
            ]),
            genNode[type]('3', false, false, [
                genNode[type]('3-1', false, false, [
                    genNode[type]('3-1-1', false, false, []), genNode[type]('3-1-2', false, false, []), genNode[type]('3-1-3', false, false, [])
                ]),
                genNode[type]('3-2', false, false, [
                    genNode[type]('3-2-1', false, false, []), genNode[type]('3-2-2', false, false, []), genNode[type]('3-2-3', false, false, [])
                ]),
                genNode[type]('3-3', false, false, [
                    genNode[type]('3-3-1', false, false, []), genNode[type]('3-3-2', false, false, []), genNode[type]('3-3-3', false, false, [])
                ])
            ])
        ])
    }

    function Handler(target) {
        return {
            prop: function(name, value) {
                _.each($containers, function(container) {
                    _.each($(target, container), function(item /*, index*/ ) {
                        expect(
                            $(item).prop(name)
                        ).to.equal(value)
                    })
                })
                return this
            },
            Handler: Handler
        }
    }
    Handler.value = function(value) {
        _.each($containers, function(container) {
            expect(
                Linkage.val(container)
            ).to.deep.equal(value)
        })
        return this
    }
    Handler.click = function(target) {
        _.each($containers, function(container) {
            $(target, container).click()
        })
        return Handler
    }
    Handler.disable = function(target) {
        _.each($containers, function(container) {
            $(target, container).prop('disabled', true)
        })
        return Handler
    }
    Handler.enable = function(target) {
        _.each($containers, function(container) {
            $(target, container).prop('disabled', false)
        })
        return Handler
    }
    Handler.check = function(target) {
        _.each($containers, function(container) {
            $(target, container).prop('checked', true)
        })
        return Handler
    }
    Handler.uncheck = function(target) {
        _.each($containers, function(container) {
            $(target, container).prop('checked', false)
        })
        return Handler
    }

    afterEach(function(done) {
        // _.each($containers, function(item /*,index*/ ) {
        //     Linkage.off(item)
        // })
        // $containers.empty()
        done()
    })
    beforeEach(function(done) {
        _.each($containers, function(item /*,index*/ ) {
            Linkage(item, function( /*event, values*/ ) {
                // console.log(item, values)
            })
        })
        done()
    })

    it('checkbox', function(done) {
        $containers.html(genData('checkbox').html())

        Handler.click('#1-1-1')
        Handler('#1-1-1').prop('checked', true).prop('indeterminate', false)
        Handler('#ROOT,#1,#1-1').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1-1'
        ])

        Handler.click('#1-1-2')
        Handler('#1-1-2').prop('checked', true).prop('indeterminate', false)
        Handler('#ROOT,#1,#1-1').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1-1', '1-1-2'
        ])

        Handler.click('#1-1-3')
        Handler('#1-1,#1-1-3').prop('checked', true).prop('indeterminate', false)
        Handler('#ROOT,#1').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1', '1-1-1', '1-1-2', '1-1-3'
        ])

        Handler.click('#1-2')
        Handler('#1-2,#1-2-1,#1-2-2,#1-2-3').prop('checked', true).prop('indeterminate', false)
        Handler('#ROOT,#1').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1', '1-1-1', '1-1-2', '1-1-3',
            '1-2', '1-2-1', '1-2-2', '1-2-3'
        ])


        // 在 phantomjs 中，如果 checked false + indeterminate true，点击后变为：checked false + indeterminate false
        // 而在浏览器中，则变为 checked false + indeterminate false
        // $('[id="1"]').prop('indeterminate', false).prop('checked', true)
        Handler.click('#1')
        Handler('#1').prop('checked', true).prop('indeterminate', false)
        Handler('#1-1,#1-1-1,#1-1-2,#1-1-3').prop('checked', true).prop('indeterminate', false)
        Handler('#1-2,#1-2-1,#1-2-2,#1-2-3').prop('checked', true).prop('indeterminate', false)
        Handler('#1-3,#1-3-1,#1-3-2,#1-3-3').prop('checked', true).prop('indeterminate', false)
        Handler('#ROOT').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1',
            '1-1', '1-1-1', '1-1-2', '1-1-3',
            '1-2', '1-2-1', '1-2-2', '1-2-3',
            '1-3', '1-3-1', '1-3-2', '1-3-3'
        ])

        Handler.click('#2')
        Handler('#2').prop('checked', true).prop('indeterminate', false)
        Handler('#2-1,#2-1-1,#2-1-2,#2-1-3').prop('checked', true).prop('indeterminate', false)
        Handler('#2-2,#2-2-1,#2-2-2,#2-2-3').prop('checked', true).prop('indeterminate', false)
        Handler('#2-3,#2-3-1,#2-3-2,#2-3-3').prop('checked', true).prop('indeterminate', false)
        Handler.value([
            '1',
            '1-1', '1-1-1', '1-1-2', '1-1-3',
            '1-2', '1-2-1', '1-2-2', '1-2-3',
            '1-3', '1-3-1', '1-3-2', '1-3-3',
            '2',
            '2-1', '2-1-1', '2-1-2', '2-1-3',
            '2-2', '2-2-1', '2-2-2', '2-2-3',
            '2-3', '2-3-1', '2-3-2', '2-3-3'
        ])

        Handler.click('#3')
        Handler('#3').prop('checked', true).prop('indeterminate', false)
        Handler('#3-1,#3-1-1,#3-1-2,#3-1-3').prop('checked', true).prop('indeterminate', false)
        Handler('#3-2,#3-2-1,#3-2-2,#3-2-3').prop('checked', true).prop('indeterminate', false)
        Handler('#3-3,#3-3-1,#3-3-2,#3-3-3').prop('checked', true).prop('indeterminate', false)
        Handler('#ROOT').prop('checked', true).prop('indeterminate', false)
        Handler.value([
            'ROOT',
            '1',
            '1-1', '1-1-1', '1-1-2', '1-1-3',
            '1-2', '1-2-1', '1-2-2', '1-2-3',
            '1-3', '1-3-1', '1-3-2', '1-3-3',
            '2',
            '2-1', '2-1-1', '2-1-2', '2-1-3',
            '2-2', '2-2-1', '2-2-2', '2-2-3',
            '2-3', '2-3-1', '2-3-2', '2-3-3',
            '3',
            '3-1', '3-1-1', '3-1-2', '3-1-3',
            '3-2', '3-2-1', '3-2-2', '3-2-3',
            '3-3', '3-3-1', '3-3-2', '3-3-3'
        ])

        Handler.click('#ROOT')
        Handler([
            '#ROOT',
            '#1',
            '#1-1', '#1-1-1', '#1-1-2', '#1-1-3',
            '#1-2', '#1-2-1', '#1-2-2', '#1-2-3',
            '#1-3', '#1-3-1', '#1-3-2', '#1-3-3',
            '#2',
            '#2-1', '#2-1-1', '#2-1-2', '#2-1-3',
            '#2-2', '#2-2-1', '#2-2-2', '#2-2-3',
            '#2-3', '#2-3-1', '#2-3-2', '#2-3-3',
            '#3',
            '#3-1', '#3-1-1', '#3-1-2', '#3-1-3',
            '#3-2', '#3-2-1', '#3-2-2', '#3-2-3',
            '#3-3', '#3-3-1', '#3-3-2', '#3-3-3'
        ].join(',')).prop('checked', false).prop('indeterminate', false)
        Handler.value([])

        Handler.click('#ROOT')
        Handler([
            '#ROOT',
            '#1',
            '#1-1', '#1-1-1', '#1-1-2', '#1-1-3',
            '#1-2', '#1-2-1', '#1-2-2', '#1-2-3',
            '#1-3', '#1-3-1', '#1-3-2', '#1-3-3',
            '#2',
            '#2-1', '#2-1-1', '#2-1-2', '#2-1-3',
            '#2-2', '#2-2-1', '#2-2-2', '#2-2-3',
            '#2-3', '#2-3-1', '#2-3-2', '#2-3-3',
            '#3',
            '#3-1', '#3-1-1', '#3-1-2', '#3-1-3',
            '#3-2', '#3-2-1', '#3-2-2', '#3-2-3',
            '#3-3', '#3-3-1', '#3-3-2', '#3-3-3'
        ].join(',')).prop('checked', true).prop('indeterminate', false)
        Handler.value([
            'ROOT',
            '1',
            '1-1', '1-1-1', '1-1-2', '1-1-3',
            '1-2', '1-2-1', '1-2-2', '1-2-3',
            '1-3', '1-3-1', '1-3-2', '1-3-3',
            '2',
            '2-1', '2-1-1', '2-1-2', '2-1-3',
            '2-2', '2-2-1', '2-2-2', '2-2-3',
            '2-3', '2-3-1', '2-3-2', '2-3-3',
            '3',
            '3-1', '3-1-1', '3-1-2', '3-1-3',
            '3-2', '3-2-1', '3-2-2', '3-2-3',
            '3-3', '3-3-1', '3-3-2', '3-3-3'
        ])

        done()
    })

    it('checkbox + disabled + unchecked', function(done) {
        $containers.html(genData('checkbox').html())

        Handler.disable('#1-1-1')
        Handler('#1-1-1,#1-1,#1,#ROOT').prop('checked', false).prop('indeterminate', false)
        Handler.value([])

        Handler.click('#1-1-2')
        Handler('#1-1-2').prop('checked', true).prop('indeterminate', false)
        Handler('#1-1,#1,#ROOT').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1-2'
        ])

        Handler.click('#1-1-3')
        Handler('#1-1-3').prop('checked', true).prop('indeterminate', false)
        Handler('#1-1,#1,#ROOT').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1-2',
            '1-1-3'
        ])

        // TODO 点击后变成 全选，真实值应该是 半选
        Handler.click('#1-1')
        Handler('#1-1-1').prop('checked', false).prop('indeterminate', false)
        Handler('#1-1-2,#1-1-3').prop('checked', true).prop('indeterminate', false)
        Handler('#1-1').prop('checked', true).prop('indeterminate', false)
        Handler('#1,#ROOT').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1',
            '1-1-2',
            '1-1-3'
        ])

        done()
    })

    it('checkbox + disabled + checked', function(done) {
        $containers.html(genData('checkbox').html())

        Handler.check('#1-1-1').disable('#1-1-1')
        Handler('#1-1-1').prop('checked', true).prop('indeterminate', false)
        Handler('#1-1,#1,#ROOT').prop('checked', false).prop('indeterminate', false)
        Handler.value([
            '1-1-1'
        ])

        Handler.click('#1-1-2')
        Handler('#1-1-2').prop('checked', true).prop('indeterminate', false)
        Handler('#1-1,#1,#ROOT').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1-1',
            '1-1-2'
        ])

        Handler.click('#1-1-3')
        Handler('#1-1-3,#1-1').prop('checked', true).prop('indeterminate', false)
        Handler('#1,#ROOT').prop('checked', false).prop('indeterminate', true)
        Handler.value([
            '1-1',
            '1-1-1',
            '1-1-2',
            '1-1-3'
        ])

        Handler.click('#1-1')
        Handler('#1-1-1').prop('checked', true).prop('indeterminate', false)
        Handler('#1-1-2,#1-1-3').prop('checked', false).prop('indeterminate', false)
        Handler('#ROOT,#1,#1-1').prop('checked', false).prop('indeterminate', false)
        Handler.value([
            '1-1-1'
        ])

        done()
    })

    it('radio', function(done) {
        $containers.html(
            $('<form>').html(genData('radio').html())
        )

        Handler.click('#1-1-1')
        Handler('#ROOT,#1,#1-1').prop('checked', true).prop('indeterminate', false)
        Handler('#2,#3').prop('checked', false).prop('indeterminate', false)

        done()
    })

    // it('radio + disabled', function(done) {
    //     done()
    // })
    // it('checkbox + radio', function(done) {
    //     done()
    // })
    // it('checkbox disabled + radio', function(done) {
    //     done()
    // })
    // it('checkbox + radio disabled', function(done) {
    //     done()
    // })
    // it('checkbox disabled + radio disabled', function(done) {
    //     done()
    // })
    // it('Linkage.val( container )', function(done) {
    //     done()
    // })
    // it('Linkage.val( container, values )', function(done) {
    //     done()
    // })
})