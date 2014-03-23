/*
    This is the parser. It creates the parse tree from tokens spat out of the lexer.
*/
var _ = require('../bower_components/lodash/dist/lodash');
var l = function(c) {
    console.log(c)
}

exports.run = function(tokens) {

    var parseRemaining = function(target, remainingTokens) {
        if (remainingTokens.length) {
            var token = _.first(remainingTokens);

            if (token === 'beginExp') {
                var innerTree = {
                    type: 'expression',
                    body: [],
                    parent: target
                }
                target.body.push(innerTree);
                parseRemaining(innerTree, _.rest(remainingTokens))
            } else {
                parseRemaining(target, _.rest(remainingTokens))

                target.body.push(token);
            }

        }
    }
    var mainObject = {
        type: 'main object',
        body: []
    };

    parseRemaining(mainObject, tokens, null);

    return mainObject;
}
