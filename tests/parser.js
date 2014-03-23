var parser = require('../js/parser.js');

describe('Parser', function() {
    it('create a global namespace.', function() {
        expect(parser.run([]).type).toEqual('main object')
    });
    it('add identifiers.', function() {
        expect(parser.run([{type: 'identifier', value: '1'}]).body).toEqual([{
            type: 'identifier',
            value: '1'
        }])
    });
    it('adds identifiers in expressions.', function() {
        expect(parser.run([{type: 'beginExp', value: null}, {type: 'identifier', value: 'id1'}, {type: 'identifier', value: 'id2'}]).body[0].body.map(function(token) {return token.value})).toEqual(['id1', 'id2'])
    });
})
