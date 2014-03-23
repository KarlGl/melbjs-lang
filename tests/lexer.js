var app = require('../js/lexer.js');

describe('Lexer', function() {
    it('identifies (', function() {
        expect(app.run('(foo').map(function(token) {
            return token.type
        })).toEqual(['beginExp', 'identifier'])
    })
    it('identifies custom identifier', function() {
        expect(app.run('foo')).toEqual([{
            type: 'identifier',
            value: 'foo'
        }])
    })
})
