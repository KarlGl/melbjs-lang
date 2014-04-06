/*
    This is the lexer. It performs lexical analysis of a string (the code),
    and turns it into an array of tokens. which may be a plain string,
    or an object with the keys "type" and "value" (in the case of identifiers).
*/

var _ = require('../bower_components/lodash/dist/lodash');

exports.run = function(input) {
    return _.reduce(input, function(ac, c) {

        var char = {
            // the intenal smybol for a keyword represented by this char.
            keyword: {
                '(': 'beginExp',
                ')': 'endExp',
                ',': 'comma',
                '\n': 'newline',
                ' ': 'space',
            }[c],
            // factory for appending new tokens with value.
            addToLastTokensValue: function() {
                return _.initial(ac).concat({
                    type: _.last(ac).type,
                    value: _.last(ac).value + c
                })
            },
            addToLastTokensValueIfNoKeywordOrSpace: function(elseBlock) {
                return (!this.keyword || this.keyword === 'space') ?
                    this.addToLastTokensValue() :
                    elseBlock();
            },
            isIdentifier: function(token) {
                // could be checking the -1 indexed token.
                return (token && token.type === 'identifier');
            },
            append: function(type) {
                return ac.concat({
                    type: type,
                    value: c
                })
            },
            appendIdenfifierOrKeyword: function() {
                return (this.keyword) ? this.append(this.keyword) : this.append('identifier');
            },
            withMyToken: function() {
                var previousToken = _.last(ac);
                // if prev is id, add to it if you are space or a char
                return (this.isIdentifier(previousToken)) ?
                    this.addToLastTokensValueIfNoKeywordOrSpace(function() {
                        //else block
                        return this.append(this.keyword)
                    }.bind(this)) :
                    this.appendIdenfifierOrKeyword()
            }
        }
        return char.withMyToken()


    }, [], this);
};
