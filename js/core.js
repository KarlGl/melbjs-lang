var lexer = require('./lexer')
var parser = require('./parser')
var compiler = require('./compiler')
var evaluator = require('./evaluator')
var subroutines = require('./subroutines')
var _ = require('../bower_components/lodash/dist/lodash');

// Call .run on each object.
exports.functionRunner = function(functions, input) {
    if (functions.length) {
        try {
            var output = _.first(functions).run(input)
        } catch (exception) {
            return exception.message
        }
        return exports.functionRunner(_.rest(functions), output)
    } else {
        // terminator...
        return input
    }
}

exports.allFunctions = [
    lexer,
    parser,
    compiler,
    evaluator
]

exports.run = function(input) {
    return exports.functionRunner(exports.allFunctions, input)
}

exports.lexer = lexer
exports.compiler = compiler
exports.parser = parser
exports.evaluator = evaluator
exports.subroutines = subroutines
