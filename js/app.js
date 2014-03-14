lexer = require('./lexer')
parser = require('./parser')
evaluator = require('./evaluator')

window.lexer = lexer
window.parser = parser
window.evaluator = evaluator

window.karl = function(input) {
    return evaluator.eval(
        parser.parse(
            lexer.lex(
                input)));
}
