var errors = require('./errors');
var subroutines = require('../subroutines');
var _ = require('../../bower_components/lodash/dist/lodash');

// This is where we call native functions like assignment etc.
exports.Expression = function(evalFunc, arguments) {
    var functionIdentifier = errors.throwIfFalse(arguments[0], "Expression had no function name (first part).");
    return {
        function: errors.throwIfFalse(
            subroutines.functions[
                evalFunc(functionIdentifier)],
            'No function by the name of ' + functionIdentifier.value),

        arguments: _.rest(_.select(arguments,
            function(x, i) {
                return i % 2 === 0
            })),

        run: function() {
            var evaluatedArguments = this.arguments.map(evalFunc);
            return this.
            function([this.function].concat(evaluatedArguments))
        }
    }
}
