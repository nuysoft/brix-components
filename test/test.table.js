/* global chai, describe, it, before */
/* global require, console */
/* global Loader: true, $: true, _: true, heredoc: true, $containers: true */
describe('Table', function() {
    this.timeout(5000)

    var expect = chai.expect
    before(function(done) {
        require(
            [
                'brix/loader', 'jquery', 'underscore', 'mock',
                'components/table'
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

    function query_check(result, $container, events) {
        _.extend(result, {
            component: Loader.query('components/table', $container)[0],
            events: $._data(document.body).events
        })

        expect(result.component).to.not.equal(undefined)
        expect(result.events).to.be.equal(undefined)

        return result
    }


    it('div [bx-name] todo', function(done) {
        $containers.append(heredoc(function() {
            /*
            <table bx-name="components/table"></table>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, 0)
        }
        boot_check(this.test.title, before, [], done)
    })
})