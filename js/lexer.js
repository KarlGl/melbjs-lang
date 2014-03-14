var _ = require('../bower_components/lodash/dist/lodash');
var l = function(c) {
    console.log(c)
}
var getType = function(c) {
    return _.reduce({
        begin: function(c) {
            return c === "("
        },
        end: function(c) {
            return c === ")"
        },
        quote: function(c) {
            return c === '"'
        },
        comma: function(c) {
            return c === ','
        },
        beginSet: function(c) {
            return c === '{'
        },
        endSet: function(c) {
            return c === '{'
        },
        assign: function(c) {
            return c === ':'
        },
    }, function(ac, test, key) {
        return test(c) ? key : ac
    }, 'identifier')
}
exports.getType = getType

exports.lex = function(input) {

    return _.reduce(input, function(ac, c) {
        var cachedType = getType(c)

        var addToLastElementsValue = function(ac, c) {
            return _.initial(ac).concat({
                type: _.last(ac).type,
                value: _.last(ac).value + c
            })
        }

        var lastElementWasIdentifier = function(ac) {
            return _.last(ac) &&
                _.last(ac).hasOwnProperty('type') &&
                _.last(ac).type === 'identifier';
        }

        var append = function(ac, type, c) {
            return ac.concat({
                type: type,
                value: c
            })
        }

        return (cachedType === 'identifier') ?
            ((lastElementWasIdentifier(ac)) ?
            addToLastElementsValue(ac, c) :
            append(ac, "identifier", c)) :
            ac.concat(cachedType)
    }, [], this);
};
