/* global chai, describe, it, before, beforeEach, afterEach */
/* global Loader: true, $: true, _: true, heredoc: true, $containers: true */
describe('ColorPicker', function() {
    this.timeout(5000)

    var expect = chai.expect

    before(function(done) {
        require(
            [
                'brix/loader', 'jquery', 'underscore', 'mock'
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

    it('[bx-name] toggle', function(done) {
        $containers.append(heredoc(function() {
            /*
            <div bx-name="components/colorpicker" class="btn btn-default">
                ColorPicker
            </div>
            */
        }))
        Loader.boot($containers, function() {
            _.each($containers, function(container /*, index*/ ) {
                var component = Loader.query('components/colorpicker', container)[0]
                component.$element.click()
                expect(component.$relatedElement.css('display')).to.equal('block')
                component.$element.click()
                expect(component.$relatedElement.css('display')).to.equal('none')
            })
            done()
        })
    })
})