/*
    This is the parser. It creates the parse tree from tokens spat out of the lexer.
*/
var _ = require('../bower_components/lodash/dist/lodash');
// number of spaces to indent
var TEXT_INDENT_WIDTH = 2;

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
            var generateComma = function() {
                return target;
            }
            var generateEndExp = function() {
                return target.parent;
            }

            var tokenHandler = {
                numberOfSpacesForIndent: function(num) {
                    return this.textIndent() * TEXT_INDENT_WIDTH;
                },
                textIndent: function() {
                    var getParent = function(child, count) {
                        return (child.parent) ?
                            getParent(child.parent, count + 1) :
                            count;
                    }
                    return getParent(target, 0)

                },
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
                changeSpaceInto: function(createCallback) {
                    // returns nubmer of how many are whitespace at end
                    var changeSpace = function(rest, len) {
                        var toProcess = _.last(rest) && _.last(rest).type;
                        return (rest.length && (toProcess === 'newline' || toProcess === 'space')) ?
                            changeSpace(_.initial(rest), len + 1) : len
                    }

                    // whole array minus, whitespace, with the new token on the end.
                    target.body = target.body.slice(0, target.body.length - changeSpace(target.body, 0))
                    return createCallback();

                },
                defaultHandler: function() {
                    target.body.push(token);
                },
                beginExp: function() {

                    if (this.consecutiveSpaces() === this.numberOfSpacesForIndent())
                        this.changeSpaceInto(function() {
                            return target; // do nothing.
                        }) // side effecty


                    return generateBeginExp();
                },
                endExp: function() {
                    return generateEndExp();
                },
                comma: function() {
                    return target;
                },
                space: function() {
                    this.defaultHandler(target);
                    return target;
                },
                newline: function() {
                    this.defaultHandler(target);

                    // if you're the last token, squash all trailing whitespace.
                    if (remainingTokens.length === 1) // only me
                        this.changeSpaceInto(function() {
                            return target; // do nothing.
                        }) // side effecty


                    return target;
                },
                identifier: function() {
                    // if there was only a newline before this

                    if (this.consecutiveSpaces() === this.numberOfSpacesForIndent() -
                        TEXT_INDENT_WIDTH)
                        target = this.changeSpaceInto(generateEndExp) // side effecty
                        // both could be true... we dont want this to run if that is the case.
                    else if (this.consecutiveSpaces() === 0)
                        target = this.changeSpaceInto(generateBeginExp) // side effecty

                    if (this.consecutiveSpaces() === this.numberOfSpacesForIndent() + TEXT_INDENT_WIDTH) {
                        target = this.changeSpaceInto(generateBeginExp) // side effecty
                        var pullInto = _.last(target.parent.body);
                        if (pullInto) {
                            target.body.push(pullInto)
                            target.parent.body.pop()
                        }
                    }

                    if (this.consecutiveSpaces() === this.numberOfSpacesForIndent())
                        target = this.changeSpaceInto(generateComma) // side effecty

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

    // add newline before and after the tokens.
    parseRemaining(mainObject, [{
        type: 'newline',
    }].concat(tokens).concat({
        type: 'newline',
    }), null);

    return mainObject;
}
