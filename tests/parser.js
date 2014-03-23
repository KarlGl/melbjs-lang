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
        expect(parser.run(['beginExp', {type: 'identifier', value: 'id'}]).body[0].body).toEqual([{
            type: 'identifier',
            value: 'id'
        }])
    });
})
