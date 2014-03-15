/*
    This is the lexer. It performs lexical analysis of a string (the code),
    and turns it into an array of tokens. which may be a plain string,
    or an object with the keys "type" and "value" (in the case of identifiers).
    
    Bug: need one space at end of all code if it's a hash.

*/

var _ = require('../bower_components/lodash/dist/lodash');
var l = function(c) {
    console.log(c)
}
var getType = function(c) {
    return 'identifier';
}
exports.getType = getType

exports.isKeyword = function(str) {
    var match = "";
    // If it contains a match of the keyword,
    // sounded by whitespace,
    // direct match,
    var hasWhiteSpaceBefore = function(keyword) {
        var ar = str.split(keyword)
        return /\s/.test(_.last(ar[0])) && (ar.length === 2)
    }
    var contains = function(keyword) {
        match = keyword
        return (match === str) || (hasWhiteSpaceBefore(keyword))
    }
    if (contains("do"))
        return [match, 'beginExp'];
    if (contains("with"))
        return [match, 'comma'];
    // only when in a hash we need this.
    if (contains("the"))
        return [match, 'beginHash'];
    if (contains("."))
        return [match, 'endHash'];
    if (contains("and"))
        return [match, 'comma'];
}


exports.lex = function(input) {

    return _.reduce(input, function(ac, c) {
        var cachedType = getType(c)

        var addToLastElementsValue = function(ac, c) {
            return _.initial(ac).concat({
                type: _.last(ac).type,
                value: _.last(ac).value + c
            })
        }

        var wasIdentifier = function(el) {
            if (!el)
                return false;
            return (el.hasOwnProperty('type') &&
                el.type === 'identifier');
        }

        // a new identifier
        var append = function(ac, type, c) {
            return ac.concat({
                type: type,
                value: c
            })
        }
        var newIdentifier = function() {
            return append(ac, "identifier", c)
        }
        var previousToken = _.last(ac)
        var takeKeyWordOutOfPreviousTokensValue = function(keyword) {
            previousToken.value = previousToken.value.split(keyword)[0]

            // Remove the trailing space from last token if needed
            if (/\s/.test(_.last(previousToken.value)))
                previousToken.value = _.initial(previousToken.value).join("")
        }

        changePreviousTokenToKeyword = function() {

            var keyword = exports.isKeyword(previousToken.value)
            var keywordName = keyword[1]

            takeKeyWordOutOfPreviousTokensValue(keyword[0])

            // remove the previous token if it has no value at all after removing the keyword.
            if (previousToken.value === "")
                ac = _.initial(ac)

            var result = ac.concat(keywordName)
            // add keyword to accumliator
            return result
        }

        if (cachedType === 'identifier') {
            if (wasIdentifier(previousToken) &&
                exports.isKeyword(previousToken.value) &&
                // whitespace tells us a keyword has ended.
                // if this char is whitespace, check last ones are a keyword.
                /\s/.test(c)) {

                return changePreviousTokenToKeyword()

            }
            return wasIdentifier(previousToken) ?
                addToLastElementsValue(ac, c) :
                newIdentifier()

        } else {
            return ac.concat(cachedType)
        }
    }, [], this);
};
