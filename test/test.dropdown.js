/* global chai, describe, it, before */
/* global require, console */
/* global Loader: true, $: true, _: true, heredoc: true, $containers: true */
describe('Dropdown', function() {
    this.timeout(5000)

    var expect = chai.expect

    before(function(done) {
        require(
            [
                'brix/loader', 'jquery', 'underscore', 'mock',
                'components/dropdown', 'components/popover', 'components/pagination'
            ],
            function() {
                Loader = arguments[0]
                $ = arguments[1]
                _ = arguments[2]
                heredoc = arguments[3].heredoc
                $containers = $('div.container')
                done()
            }
        )
    })

    afterEach(function(done) {
        Loader.boot($containers, function() {
            Loader.destroy($containers, function() {
                expect(
                    $._data(document.body).events
                ).to.equal(undefined)
                expect(
                    Loader.CACHE
                ).to.deep.equal({})
                done()
            })
        })
    })

    beforeEach(function(done) {
        done()
    })

    function boot_check(title, before, task_expected, done) {
        function complete() {
            try {
                for (var i = 0; i < $containers.length; i++) {
                    var $container = $($containers[i])
                    before($container)
                    for (var ii = 0; ii < task_expected.length; ii++) {
                        task_expected[ii][0]($container)
                        task_expected[ii][1]($container)
                    }
                }
            } catch (e) {
                console.error(title, e)
                throw e
            }
            done()
        }
        Loader.boot($containers, complete)
    }

    function query_check(result, $container, value, events) {
        _.extend(result, {
            component: Loader.query('components/dropdown', $container)[0],

            $element: $container.find('select'),
            $relatedElement: $container.find('div.dropdown'),
            $toggle: $container.find('div.dropdown > button.dropdown-toggle'),
            $wrapper: $container.find('div.dropdown > div.dropdown-menu-wrapper'),
            $searchbox: $container.find('div.dropdown > div.dropdown-menu-wrapper > div.searchbox'),
            $menu: $container.find('div.dropdown > div.dropdown-menu-wrapper > ul.dropdown-menu'),
            $items: $container.find('div.dropdown > div.dropdown-menu-wrapper > ul.dropdown-menu > li'),
            $active: $container.find('div.dropdown > div.dropdown-menu-wrapper > ul.dropdown-menu > li.active'),

            events: $._data(document.body).events
        })

        expect(result.component).to.not.equal(undefined)
        expect(result.$element.css('display')).to.equal('none')
        expect(result.$relatedElement).to.have.length(1)
        expect(result.$toggle).to.have.length(1)
        expect(result.$wrapper).to.have.length(1)
        expect(result.$wrapper.css('display')).to.equal('none')

        expect(result.component.val()).to.be.a('string').equal(value) // val
        expect(result.events.click).to.be.an('array').with.length(events) // event: click x4 + autohide x4

        return result
    }

    function toggle_select_check(result, index, value) {
        return [
            function() {
                result.$toggle.click()
                result.$items.eq(index).find('> a').click()
                result.$active = result.$items.filter('.active')
            },
            function() {
                expect(result.$wrapper.css('display')).to.equal('none')
                expect(result.$active.index()).to.equal(index)
                expect(result.component.val()).to.equal(value)
            }
        ]
    }

    it('select [bx-name] toggle', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown">
                <option value="0">Action</option>
                <option value="1">Another action</option>
                <option value="2">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$items).to.have.length(3)
            expect(result.$active).to.have.length(1)
            expect(result.$active.index()).to.equal(0)
        }
        var task = function($container) {
            result.$toggle.click()
        }
        var expected = function($container) {
            expect(result.$wrapper.css('display')).to.equal('block')
        }
        boot_check(this.test.title, before, [
            [task, expected]
        ], done)
    })

    it('select [bx-name] toggle toggle', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown">
                <option value="0">Action</option>
                <option value="1">Another action</option>
                <option value="2">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$items).to.have.length(3)
            expect(result.$active.index()).to.equal(0)
        }
        var task = function($container) {
            result.$toggle.click().click()
        }
        var expected = function($container) {
            expect(result.$wrapper.css('display')).to.equal('none')
        }
        boot_check(this.test.title, before, [
            [task, expected]
        ], done)
    })

    it('select [bx-name] toggle select', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown">
                <option value="0">Action</option>
                <option value="1">Another action</option>
                <option value="2">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$items).to.have.length(3)
            expect(result.$active.index()).to.equal(0)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 0, '0'),
            toggle_select_check(result, 1, '1'),
            toggle_select_check(result, 2, '2')
        ], done)
    })

    it('select [bx-name] [data-value] toggle select', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-value="1">
                <option value="0">Action</option>
                <option value="1">Another action</option>
                <option value="2">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '1', 8)
            expect(result.$items).to.have.length(3)
            expect(result.$active.index()).to.equal(1)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 0, '0'),
            toggle_select_check(result, 1, '1'),
            toggle_select_check(result, 2, '2')
        ], done)
    })

    it('select [bx-name] [data-value=""] toggle select', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-value="">
                <option value="">Action</option>
                <option value="true">Another action</option>
                <option value="false">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '', 8)
            expect(result.$items).to.have.length(3)
            expect(result.$active.index()).to.equal(0)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 0, ''),
            toggle_select_check(result, 1, 'true'),
            toggle_select_check(result, 2, 'false')
        ], done)
    })

    it('select [bx-name] [data-value="true"] toggle select', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-value="true">
                <option value="">Action</option>
                <option value="true">Another action</option>
                <option value="false">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, 'true', 8)
            expect(result.$items).to.have.length(3)
            expect(result.$active.index()).to.equal(1)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 0, ''),
            toggle_select_check(result, 1, 'true'),
            toggle_select_check(result, 2, 'false')
        ], done)
    })

    it('select [bx-name] [data-value="false"] toggle select', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-value="false">
                <option value="">Action</option>
                <option value="true">Another action</option>
                <option value="false">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, 'false', 8)
            expect(result.$items).to.have.length(3)
            expect(result.$active.index()).to.equal(2)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 0, ''),
            toggle_select_check(result, 1, 'true'),
            toggle_select_check(result, 2, 'false')
        ], done)
    })

    it('select [bx-name] <optgroup>', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown">
                <optgroup label="optgroup 0">
                    <option value="0">Action</option>
                </optgroup>
                <optgroup label="optgroup 1">
                    <option value="1">Another action</option>
                </optgroup>
                <optgroup label="optgroup 2">
                    <option value="2">Something else here</option>
                </optgroup>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$items).to.have.length(6)
            expect(result.$active.index()).to.equal(1)
            expect(result.$items.eq(0).hasClass('dropdown-header')).to.equal(true)
            expect(result.$items.eq(2).hasClass('dropdown-header')).to.equal(true)
            expect(result.$items.eq(4).hasClass('dropdown-header')).to.equal(true)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 1, '0'),
            toggle_select_check(result, 3, '1'),
            toggle_select_check(result, 5, '2')
        ], done)
    })

    it('select [bx-name] <optgroup> selected', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown">
                <optgroup label="optgroup 0">
                    <option value="0">Action</option>
                </optgroup>
                <optgroup label="optgroup 1">
                    <option value="1" selected>Another action</option>
                </optgroup>
                <optgroup label="optgroup 2">
                    <option value="2">Something else here</option>
                </optgroup>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '1', 8)
            expect(result.$items).to.have.length(6)
            expect(result.$active.index()).to.equal(3)
            expect(result.$items.eq(0).hasClass('dropdown-header')).to.equal(true)
            expect(result.$items.eq(2).hasClass('dropdown-header')).to.equal(true)
            expect(result.$items.eq(4).hasClass('dropdown-header')).to.equal(true)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 1, '0'),
            toggle_select_check(result, 3, '1'),
            toggle_select_check(result, 5, '2')
        ], done)
    })

    it('select [bx-name] [data-data]', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-data="[
                {
                    label: 'Action',
                    value: 0
                }, {
                    label: 'Another action',
                    value: 1
                }, {
                    label: 'Something else here',
                    value: 2
                }
            ]"></select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$element.children()).to.have.length(3)
            expect(result.$items).to.have.length(3)
            expect(result.$active.index()).to.equal(0)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 0, '0'),
            toggle_select_check(result, 1, '1'),
            toggle_select_check(result, 2, '2')
        ], done)
    })

    it('select [bx-name] [data-data] selected">', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-data="[
                {
                    label: 'Action',
                    value: 0
                }, {
                    label: 'Another action',
                    value: 1,
                    selected: true
                }, {
                    label: 'Something else here',
                    value: 2
                }
            ]"></select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '1', 8)
            expect(result.$items).to.have.length(3)
            expect(result.$items.eq(0).hasClass('dropdown-header')).to.equal(false)

        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 0, '0'),
            toggle_select_check(result, 1, '1'),
            toggle_select_check(result, 2, '2')
        ], done)
    })

    it('select [bx-name] [data-data] optgroup', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-data="[
                {
                    label: 'optgroup 0',
                    children: [{
                        label: 'Action',
                        value: 0
                    }]
                }, {
                    label: 'optgroup 1',
                    children: [{
                        label: 'Another action',
                        value: 1
                    }]
                }, {
                    label: 'optgroup 2',
                    children: [{
                        label: 'Something else here',
                        value: 2
                    }]
                }
            ]"></select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$element.children()).to.have.length(3)
            expect(result.$items).to.have.length(6)
            expect(result.$active.index()).to.equal(1)
            expect(result.$items.eq(0).hasClass('dropdown-header')).to.equal(true)
            expect(result.$items.eq(2).hasClass('dropdown-header')).to.equal(true)
            expect(result.$items.eq(4).hasClass('dropdown-header')).to.equal(true)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 1, '0'),
            toggle_select_check(result, 3, '1'),
            toggle_select_check(result, 5, '2')
        ], done)
    })

    it('select [bx-name] [data-data] optgroup selected', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-data="[
                {
                    label: 'optgroup 0',
                    children: [{
                        label: 'Action',
                        value: 0
                    }]
                }, {
                    label: 'optgroup 1',
                    children: [{
                        label: 'Another action',
                        value: 1,
                        selected: true
                    }]
                }, {
                    label: 'optgroup 2',
                    children: [{
                        label: 'Something else here',
                        value: 2
                    }]
                }
            ]"></select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '1', 8)
            expect(result.$element.children()).to.have.length(3)
            expect(result.$items).to.have.length(6)
            expect(result.$active.index()).to.equal(3)
            expect(result.$items.eq(0).hasClass('dropdown-header')).to.equal(true)
            expect(result.$items.eq(2).hasClass('dropdown-header')).to.equal(true)
            expect(result.$items.eq(4).hasClass('dropdown-header')).to.equal(true)
        }
        boot_check(this.test.title, before, [
            // task expected
            toggle_select_check(result, 1, '0'),
            toggle_select_check(result, 3, '1'),
            toggle_select_check(result, 5, '2')
        ], done)
    })

    function input_keyup_search_check(result, value, event, show, hide) {
        return [
            function() {
                result.$searchbox.find('input').val(value).trigger(event)
            },
            function() {
                show.forEach(function(index) {
                    expect(result.$items.eq(index).css('display')).to.equal('list-item')
                })
                hide.forEach(function(index) {
                    expect(result.$items.eq(index).css('display')).to.equal('none')
                })
            }
        ]
    }

    it('select [bx-name] [data-searchbox="true"] [bx-search="filter"]', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-searchbox="true" bx-search="filter">
                <option value="0">Action</option>
                <option value="1">Another action</option>
                <option value="2">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$searchbox).to.have.length(1)
            expect(result.$items).to.have.length(3)
            expect(result.events.keyup).to.be.an('array').with.length(4)
            expect(result.events.search).to.be.an('array').with.length(4)
        }
        var event = 'keyup'
        boot_check(this.test.title, before, [
            // task expected
            input_keyup_search_check(result, 'A', event, [0, 1], [2]),
            input_keyup_search_check(result, 'Ac', event, [0], [1, 2]),
            input_keyup_search_check(result, 'Action', event, [0], [1, 2]),
            input_keyup_search_check(result, 'Action', event, [0], [1, 2]),
            input_keyup_search_check(result, 'mo', event, [], [0, 1, 2])
        ], done)
    })

    it('select [bx-name] [data-searchbox="enter"] [bx-search="filter"]', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-searchbox="enter" bx-search="filter">
                <option value="0">Action</option>
                <option value="1">Another action</option>
                <option value="2">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$searchbox).to.have.length(1)
            expect(result.$items).to.have.length(3)
            expect(result.events.keyup).to.be.an('array').with.length(4)
            expect(result.events.search).to.be.an('array').with.length(4)
        }
        var event = ({
            type: 'keyup',
            keyCode: 13
        })
        boot_check(this.test.title, before, [
            // task expected
            input_keyup_search_check(result, 'A', event, [0, 1], [2]),
            input_keyup_search_check(result, 'Ac', event, [0], [1, 2]),
            input_keyup_search_check(result, 'Action', event, [0], [1, 2]),
            input_keyup_search_check(result, 'Action', event, [0], [1, 2]),
            input_keyup_search_check(result, 'mo', event, [], [0, 1, 2])
        ], done)
    })

    function hover_check(result, index) {
        return [
            function() {
                var evt = document.createEvent('CustomEvent') // MUST be 'CustomEvent'
                evt.initCustomEvent('mouseenter', false, false, null)
                
                result.$toggle.click()
                result.$items.eq(index).find('> a').trigger('mouseenter')
                result.$items.eq(index).find('> a').get(0)
                    .dispatchEvent(evt)
            },
            function() {
                expect(result.$items.eq(index).find('> a').attr('bx-name')).to.equal('components/popover')
            }
        ]
    }

    it('select [bx-name] [data-popover="true"]', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-popover="true">
                <option value="0">Action</option>
                <option value="1">Another action</option>
                <option value="2">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$items).to.have.length(3)
        }
        boot_check(this.test.title, before, [
            // task expected
            hover_check(result, 0),
            hover_check(result, 1),
            hover_check(result, 2)
        ], done)
    })

    it('select [bx-name] [data-popover="200"]', function(done) {
        $containers.append(heredoc(function() {
            /*
            <select bx-name="components/dropdown" data-popover="200">
                <option value="0">Action</option>
                <option value="1">Another action</option>
                <option value="2">Something else here</option>
            </select>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, '0', 8)
            expect(result.$items).to.have.length(3)
        }
        boot_check(this.test.title, before, [
            // task expected
            hover_check(result, 0),
            hover_check(result, 1),
            hover_check(result, 2)
        ], done)
    })

})