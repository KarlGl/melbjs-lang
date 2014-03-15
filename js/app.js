var core = require('./core')

var isBrowser = (typeof window !== 'undefined')

if (isBrowser) {
    frontend = require('./frontend')
}

exports.karl = core.karl

if (isBrowser) {
    window.lexer = lexer
    window.parser = parser
    window.evaluator = evaluator
    window.karl = exports.karl
}
