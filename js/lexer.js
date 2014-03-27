/*
    This is the lexer. It performs lexical analysis of a string (the code),
    and turns it into an array of tokens. which may be a plain string,
    or an object with the keys "type" and "value" (in the case of identifiers).
*/

var _ = require('../bower_components/lodash/dist/lodash');
var l = function(c) {
    console.log(c)
}
var getType = function(c) {
    return 'identifier';
}

exports.scannerSymbols = {
    '(': 'beginExp',
    ')': 'endExp',
    ',': 'comma',
}

exports.getKeyword = function(str) {
    return exports.scannerSymbols[str]
}


exports.run = function(input) {

    return _.reduce(input, function(ac, c) {
        var type = exports.getKeyword(c)

        var addToLastTokensValue = function(ac, c) {
            return _.initial(ac).concat({
                type: _.last(ac).type,
                value: _.last(ac).value + c
            })
        }

        var isIdentifier = function(el) {
            // could be checking the -1 indexed token.
            return (el && el.type === 'identifier');
        }

        // factory for appending new tokens with value.
        var append = function(ac, type, c) {
            return ac.concat({
                type: type,
                value: c
            })
        }

        // add a new identifier
        var newIdentifier = function() {
            return append(ac, "identifier", c)
        }
        var previousToken = _.last(ac)

        if (type) {
            return append(ac, type, null)
        } else {
            return isIdentifier(previousToken) ?
                addToLastTokensValue(ac, c) :
                newIdentifier()
        }
    }, [], this);
};
