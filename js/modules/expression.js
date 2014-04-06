var errors = require('./errors');
var subroutines = require('../subroutines');
var _ = require('../../bower_components/lodash/dist/lodash');

// This is where we call native functions like assignment etc.
exports.Expression = function(evalFunc, leaf) {
    var arguments = leaf.body
    var functionIdentifier = errors.throwIfFalse(arguments[0], "Expression had no function name (first part).");
    var functionName = functionIdentifier.value
    return {
        // not needed, but might be useful?
        functionName: functionName,

        function: errors.throwIfFalse(
            subroutines.functions[
                evalFunc(functionIdentifier)],
            'No function by the name of ' + functionName),

        arguments: _.rest(_.select(arguments,
            function(x, i) {
                return i % 2 === 0
            })),

        run: function() {
            // pass the local varialbes to the function running
            return this.function(this.arguments, evalFunc, leaf)
        }
    }
}
