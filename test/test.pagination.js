/* global chai, describe, it, before, beforeEach, afterEach */
/* global Loader: true, $: true, _: true, heredoc: true, $containers: true */
describe('Pagination', function() {
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
        // 确保 boot 完成
        Loader.boot($containers, function() {
            Loader.destroy($containers, function() {
                expect(
                    Loader.CACHE
                ).to.deep.equal({})
                expect(
                    $._data(document.body).events
                ).to.equal(undefined)
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

    function query_check(result, $container, events) {
        _.extend(result, {
            component: Loader.query('components/pagination', $container)[0],
            events: $._data(document.body).events
        })
        _.extend(result, {
            dropdown: Loader.query('components/dropdown', result.component)[0],
            numbers: result.component.$element.find('ul.pagination > li').slice(1, -1),
            active: result.component.$element.find('ul.pagination > li.active')
        })

        expect(result.component).to.not.equal(undefined)
        expect(result.events.click).to.be.an('array').with.length(events) // pagination click x1 + dropdown click x1 + dropdown autohide x1
        expect(result.dropdown).to.not.equal(undefined)

        return result
    }

    function move_check(result, cursor, count) {
        return [
            function() {
                result.component.moveTo(cursor)
                result.numbers = result.component.$element.find('ul.pagination > li').slice(1, -1)
                result.active = result.component.$element.find('ul.pagination > li.active')
            },
            function() {
                expect(result.component.cursor()).to.equal(cursor)
                expect(result.numbers.length).to.equal(count)
                expect(result.active.text()).to.equal('' + cursor)
            }
        ]
    }

    it('div [bx-name] move', function(done) {
        $containers.append(heredoc(function() {
            /*
            <div bx-name="components/pagination" 
                data-total="100" 
                data-cursor="1" 
                data-limit="10"></div>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, 3 * 4)
            expect(result.component.total()).to.equal(100)
            expect(result.component.cursor()).to.equal(1)
            expect(result.dropdown.val()).to.equal('10')
            expect(result.numbers.length).to.equal(9) //  1 2 3 4 5 6 7 ... 10
        }
        boot_check(this.test.title, before, [
            move_check(result, 2, 9),
            move_check(result, 3, 9),
            move_check(result, 4, 9),
            move_check(result, 5, 10),
            move_check(result, 6, 10),
            move_check(result, 7, 10),
            move_check(result, 8, 9),
            move_check(result, 9, 8),
            move_check(result, 10, 7),
            move_check(result, 1, 9),
        ], done)
    })

    function limit_check(result, limit, cursor) {
        return [
            function() {
                result.component.limit(limit)
                result.numbers = result.component.$element.find('ul.pagination > li').slice(1, -1)
                result.active = result.component.$element.find('ul.pagination > li.active')
            },
            function() {
                expect(result.component.cursor()).to.equal(cursor)
                expect(result.active.text()).to.equal('' + cursor)
            }
        ]
    }

    it('div [bx-name] limit', function(done) {
        $containers.append(heredoc(function() {
            /*
            <div bx-name="components/pagination" 
                data-total="100" 
                data-cursor="1" 
                data-limit="9"></div>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, 3 * 4)
            expect(result.component.total()).to.equal(100)
            expect(result.component.cursor()).to.equal(1)
            expect(result.dropdown.val()).to.equal('9')
            expect(result.numbers.length).to.equal(9) //  1 2 3 4 5 6 7 ... 12

            result.component.moveTo(2)
        }
        boot_check(this.test.title, before, [
            limit_check(result, 10, 2),
            limit_check(result, 20, 2),
            limit_check(result, 30, 2),
            limit_check(result, 40, 2),
            limit_check(result, 50, 2),
        ], done)
    })

})