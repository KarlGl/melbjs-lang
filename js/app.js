lexer = require('./lexer')
parser = require('./parser')
compiler = require('./compiler')
evaluator = require('./evaluator')

exports.karl = function(input) {
    return evaluator.eval(
        compiler.eval(
            parser.parse(
                lexer.lex(
                    input))))
}

if (typeof window !== 'undefined') {
	window.lexer = lexer
	window.parser = parser
	window.evaluator = evaluator
	window.karl = exports.karl
}

