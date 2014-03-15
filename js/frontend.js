var $ = require('../bower_components/jquery/jquery.js')
var _ = require('../bower_components/lodash/dist/lodash');
var core = require('./core')

var isBrowser = (typeof window !== 'undefined')

if (isBrowser) {
    window.lexer = core.lexer
    window.parser = core.parser
    window.evaluator = core.evaluator
    window.compiler = core.compiler
    window.karl = core.karl
}

exports.init = (function() {

    var input = document.createElement('textarea')
    window.document.body.appendChild(input)

    var outputs = core.allFunctions.map(function() {
        var outputDiv = document.createElement('div')
        window.document.body.appendChild(outputDiv)
        return outputDiv
    })

    var inputChange = function() {
        var textIn = input.value

        var outputRemainingSteps = function(outputs, functions) {
            if (!outputs.length)
                return
            var result = core.functionRunner(functions, textIn);
            $(_.first(outputs)).html(result
                )
            outputRemainingSteps(_.rest(outputs), _.initial(functions))
        }

        outputRemainingSteps(outputs, core.allFunctions)
    }

    $(input).keyup(inputChange);
})()
