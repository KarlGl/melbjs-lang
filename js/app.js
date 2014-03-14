lexer = require('./lexer')
parser = require('./parser')
compiler = require('./compiler')
evaluator = require('./evaluator')

window.lexer = lexer
window.parser = parser
window.evaluator = evaluator

window.karl = function(input) {
    return evaluator.eval(
        compiler.eval(
            parser.parse(
                lexer.lex(
                    input))))
}
