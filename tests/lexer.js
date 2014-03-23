var app = require('../js/lexer.js');

describe('Lexer', function() {
    it('identifies (', function() {
        expect(app.run('(foo')).toEqual(['beginExp',  { type: 'identifier', value: 'foo' }])
    })
    it('identifies custom identifier', function() {
        expect(app.run('foo')).toEqual([{ type: 'identifier', value: 'foo' }])
    })
})
