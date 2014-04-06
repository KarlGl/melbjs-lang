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

            var tokenHandler = {
                defaultHandler: function(target) {
                    target.body.push(token);
                    return target;
                },
                beginExp: function(target) {
                    var innerTree = {
                        type: 'expression',
                        body: [],
                        parent: target
                    }
                    target.body.push(innerTree);
                    return innerTree;
                },
                endExp: function(target) {
                    return target.parent;
                },
                comma: function(target) {
                    return this.defaultHandler(target);
                },
                space: function(target) {
                    return this.defaultHandler(target);
                },
                newline: function(target) {
                    return this.defaultHandler(target);
                },
                identifier: function(target) {
                    
                    return this.defaultHandler(target);
                },
            };

            parseRemaining(tokenHandler[token.type](target), _.rest(remainingTokens))
        }
    }
    var mainObject = {
        type: 'main object',
        body: []
    };

    parseRemaining(mainObject, tokens, null);

    return mainObject;
}
