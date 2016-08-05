/* global chai, describe, it, before, beforeEach, afterEach */
/* global Loader: true, $: true, _: true, heredoc: true, $containers: true */
describe('Calendar', function() {
    this.timeout(5000)

    var expect = chai.expect

    before(function(done) {
        require(
            [
                'brix/loader', 'jquery', 'underscore', 'mock',
                'components/datepicker', 'components/datepickerwrapper'
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

    function query_check(result, $container, events, children) {
        _.extend(result, {
            component: Loader.query('components/datepickerwrapper', $container)[0],
            events: $._data(document.body).events,
            children: Loader.query('components/datepicker', $container)
        })
        _.extend(result, {})

        expect(result.component).to.not.equal(undefined)
        expect(result.events.click).to.be.an('array').with.length(events) // 
        expect(result.children).to.be.an('array').with.length(children) // 

        return result
    }

    function toggle_check(result, display) {
        return [
            function( /*$container*/ ) {
                result.component.element.click()
            },
            function( /*$container*/ ) {
                expect(
                    result.component.$relatedElement.css('display')
                ).to.equal(display)
            }
        ]
    }

    it('input [bx-name]', function(done) {
        $containers.append(heredoc(function() {
            /*
            <input bx-name="components/datepickerwrapper" type="text">
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, 3 * 4, 1)
            expect(result.component.val()).to.not.equal(undefined)
        }
        boot_check(this.test.title, before, [
            toggle_check(result, 'block'),
            toggle_check(result, 'none')
        ], done)
    })
    it('input [bx-name] data-dates', function(done) {
        $containers.append(heredoc(function() {
            /*
            <input bx-name="components/datepickerwrapper" data-dates="[ '2015-1-1', '2015-1-2']" type="text">
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, 5 * 4, 2)
            expect(result.component.val()).to.not.equal(undefined)
        }
        boot_check(this.test.title, before, [
            toggle_check(result, 'block'),
            toggle_check(result, 'none')
        ], done)
    })
})