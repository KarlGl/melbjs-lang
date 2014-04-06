var app = require('../js/compiler.js');

describe('Compiler', function() {
    it('addition multi args', function() {
        expect(eval(app.run({
            type: 'expression',
            body: [{
                type: 'identifier',
                value: '+'
            }, {
                type: 'identifier',
                value: '1'
            }, {
                type: 'identifier',
                value: '1'
            }, {
                type: 'identifier',
                value: '1'
            }]
        }))).toEqual(3)
    })
    it('one plus one', function() {
        expect(eval(app.run({
            type: 'expression',
            body: [{
                type: 'identifier',
                value: '+'
            }, {
                type: 'identifier',
                value: '1'
            }, {
                type: 'identifier',
                value: '1'
            }]
        }))).toEqual(2)
    })
})
