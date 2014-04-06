/*
    This is the parser. It creates the parse tree from tokens spat out of the lexer.
*/
var _ = require('../bower_components/lodash/dist/lodash');
// var noBracketMode = true;

exports.run = function(tokens) {

    var parseRemaining = function(target, remainingTokens) {
        if (remainingTokens.length) {
            var token = _.first(remainingTokens);

            var generateBeginExp = function() {
                var innerTree = {
                    type: 'expression',
                    body: [],
                    parent: target
                }
                target.body.push(innerTree);
                return innerTree;
            }

            var tokenHandler = {
                consecutiveSpaces: function() {
                    var spaces = function(rest, len) {
                        var toProcess, plus;
                        toProcess = rest.length && _.last(rest) && _.last(rest).type;
                        if (toProcess)
                            plus = {
                                space: 1,
                                newline: 0
                            }[toProcess];

                        return (typeof(plus) === 'number') ?
                            spaces(_.initial(rest), ((len === null) ? 0 : len) + plus) : len;

                    }
                    return spaces(target.body, null)
                },
                changeSpaceInto: function(type) {
                    // returns nubmer of how many are whitespace at end
                    var changeSpace = function(rest, len) {
                        var toProcess = _.last(rest) && _.last(rest).type;
                        return (rest.length && (toProcess === 'newline' || toProcess === 'space')) ?
                            changeSpace(_.initial(rest), len + 1) : len
                    }

                    // whole array minus, whitespace, with the new token on the end.
                    target.body = _.rest(target.body, changeSpace(target.body, 0))
                    return generateBeginExp();

                },
                defaultHandler: function() {
                    target.body.push(token);
                },
                beginExp: function() {
                    return generateBeginExp();
                },
                endExp: function() {
                    return target.parent;
                },
                comma: function() {
                    this.defaultHandler(target);
                    return target;
                },
                space: function() {
                    this.defaultHandler(target);
                    return target;
                },
                newline: function() {
                    this.defaultHandler(target);
                    return target;
                },
                identifier: function() {
                    // if there was only a newline before this
                    if (this.consecutiveSpaces() === 0)
                        target = this.changeSpaceInto('beginExp') // side effecty
                    this.defaultHandler(target)
                    return target;
                },
            };

            parseRemaining(tokenHandler[token.type](), _.rest(remainingTokens))
        }
    }
    var mainObject = {
        type: 'main object',
        body: []
    };

    // if (noBracketMode)
        // tokens = [{
        //     type: 'newline',
        //     value: '\n'
        // }].concat(tokens)
    parseRemaining(mainObject, tokens, null);

    return mainObject;
}
