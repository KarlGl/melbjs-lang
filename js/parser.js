/*
    This is the parser. It creates the parse tree from tokens spat out of the lexer.
*/
var _ = require('../bower_components/lodash/dist/lodash');
var l = function(c) {
    console.log(c)
}
exports.parse = function(remaining) {
    // var tree = {}
    var parseRest = function(remaining, parent) {

        var parseSingle = function(token, rest) {
            if (token === 'beginExp') {
                return innerTree = [{
                    type: 'expression',
                    body: parseRest(rest)
                }]
            }

            if (token.hasOwnProperty('type') && token.type === 'identifier')
                token = token.value

            if (rest.length)
                return [token].concat(parseRest(rest))
            else {
                return [token]
            }
        }

        if (remaining.length)
            return parseSingle(_.first(remaining), _.rest(remaining))
    }
    return parseRest(remaining)
    // return tree
}
