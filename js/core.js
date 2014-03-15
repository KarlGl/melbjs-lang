var lexer = require('./lexer')
var parser = require('./parser')
var compiler = require('./compiler')
var evaluator = require('./evaluator')
var _ = require('../bower_components/lodash/dist/lodash');

var isBrowser = (typeof window !== 'undefined')


exports.karl = function(input) {
    var continueIfNoError = function(functions, input) {
      	// terminator...
      	if (!functions.length) {
      		return input;
      	}
        try {
            var output = _.first(functions)(input)
        } catch (exception) {
            return exception.message
        }
        return continueIfNoError(_.rest(functions), output)
    }

    return continueIfNoError(
        [
            lexer.lex,
            parser.parse,
            compiler.eval,
            evaluator.eval
        ], input)

}

if (isBrowser) {
    window.lexer = lexer
    window.parser = parser
    window.evaluator = evaluator
    window.karl = exports.karl
}
