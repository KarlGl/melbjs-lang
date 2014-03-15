/*
    This is the parser. It creates the parse tree from tokens spat out of the lexer.
*/
var _ = require('../bower_components/lodash/dist/lodash');
var l = function(c) {
    console.log(c)
}
exports.parse = function(remaining) {
    // var tree = {}
    var parseRest = function(remaining, writeTo) {

        var parseSingle = function(token, rest) {
            var flowOut = function(val) {
                if (writeTo.hasOwnProperty('body'))
                    writeTo.body = writeTo.body.concat(val)
                return writeTo
            }

            // If expression is filled, continue on parent.
            var filledExpression = (writeTo.type === 'expression' &&
                writeTo.body.length === 3)
            var filledHash = (writeTo.type === 'hash' &&
                token === 'endHash')
            if (writeTo &&
                (filledExpression || filledHash)) {
                writeTo = writeTo.parent
            }

            // If it's an end hash, don't write anything move on.
            if (token === 'endHash') {
                parseRest(rest, innerTree)
                return writeTo
            }


            if (token === 'beginExp') {
                var innerTree = {
                    type: 'expression',
                    body: [],
                    parent: writeTo
                }
                var out = flowOut([innerTree])
                parseRest(rest, innerTree)
                return out
            }


            if (token === 'beginHash') {
                var innerTree = {
                    type: 'hash',
                    body: [],
                    parent: writeTo
                }
                var out = flowOut([innerTree])
                parseRest(rest, innerTree)
                return out
            }

            // Lookup the value part if you are an identifier.
            if (token.hasOwnProperty('type') && token.type === 'identifier')
                token = token.value
            var ret = flowOut(
                [token])
            if (rest.length) {
                parseRest(rest, writeTo)
            }
            return ret;
        }

        if (remaining.length)
            return parseSingle(_.first(remaining), _.rest(remaining))
        else
            return {
                type: 'global',
                body: []
            }
    }
    return parseRest(remaining, {
        type: 'global',
        body: []
    })
    // return tree
}
