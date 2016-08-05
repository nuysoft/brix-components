/* global chai, describe, it, before, beforeEach, afterEach */
/* global Loader: true, $: true, _: true, heredoc: true, $containers: true */
describe('Popover', function() {
    this.timeout(5000)

    var expect = chai.expect
    var Popover
    before(function(done) {
        require(
            [
                'brix/loader', 'jquery', 'underscore', 'mock',
                'components/popover'
            ],
            function() {
                Loader = arguments[0]
                $ = arguments[1]
                _ = arguments[2]
                heredoc = arguments[3].heredoc
                Popover = arguments[4]
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

    function query_check(result, $container /*, events*/ ) {
        _.extend(result, {
            component: Loader.query('components/popover', $container)[0],
            events: $._data(document.body).events
        })

        expect(result.component).to.not.equal(undefined)
        expect(result.events).to.be.equal(undefined)

        return result
    }

    function hover_check(result, event, display) {
        return [
            function() {
                result.component.$element.trigger(event)

            },
            function() {
                expect(
                    result.component.$relatedElement.css('display')
                ).to.equal(display)

                // result.component.$element.trigger('mouseleave')
                // setTimeout(function() {
                //     expect(
                //         result.component.$relatedElement.css('display')
                //     ).to.equal('none')
                // }, Popover.prototype.delay * 3)
            }
        ]
    }

    it('div [bx-name] hover', function(done) {
        $containers.append(heredoc(function() {
            /*
            <div bx-name="components/popover" data-content="Envy is the ulcer of the soul.">Popover on top</div>
            */
        }))

        var result = {}
        var before = function($container) {
            query_check(result, $container, 4)
        }
        boot_check(this.test.title, before, [
            hover_check(result, 'mouseenter', 'block'),
            hover_check(result, 'mouseleave', 'block')
        ], done)
    })

    it('div [bx-name] delay', function(done) {
        $containers.append(heredoc(function() {
            /*
            <div bx-name="components/popover" data-content="Envy is the ulcer of the soul.">Popover on top</div>
            */
        }))

        Loader.boot($containers, function() {
            var instances = Loader.query('components/popover', $containers)
            _.each(instances, function(item /*, index*/ ) {
                item.$element.trigger('mouseenter')
                expect(
                    item.$relatedElement.css('display')
                ).to.equal('block')

                item.$element.trigger('mouseleave')
            })
            setTimeout(function() {
                _.each(instances, function(item, index) {
                    expect(
                        item.$relatedElement.css('display')
                    ).to.equal('none')

                    if (index === instances.length - 1) done()
                })
            }, Popover.prototype.options.delay)
        })
    })
})