var $ = require('../bower_components/jquery/jquery.js')
var _ = require('../bower_components/lodash/dist/lodash');
var core = require('./core')
var subroutines = require('./subroutines');

var isBrowser = (typeof window !== 'undefined')

if (isBrowser) {
    window.subroutines = subroutines
    window.lexer = core.lexer
    window.parser = core.parser
    window.evaluator = core.evaluator
    window.compiler = core.compiler
    window.run = core.run
}

exports.init = (function() {

    var styleForCode = function(el) {
        el.style.fontFamily = "Courier New";
    }

    var input = document.createElement('textarea')
    window.document.body.appendChild(input)

    styleForCode(document.body);
    styleForCode(input)
    input.style.width = "50%"
    input.style.height = "25%"

    var outputs = core.allFunctions.map(function() {
        var outputDiv = document.createElement('div')
        window.document.body.appendChild(outputDiv)
        return outputDiv
    })

    if (subroutines.docs) {
        var docs = $(document.createElement('div'))
        docs.append($('<h2>Built in functions:</h2>'))
        subroutines.docs.map(function(doc) {
            var docEl = $(document.createElement('div'))
            var docName = $(document.createElement('h3'))
            var docDesc = $(document.createElement('div'))
            var docArgHead = $(document.createElement('h4'))
            docArgHead.html('Arguments:')
            docName.html(doc.name)
            docDesc.html(doc.desc)
            docEl.append(docName)
            docEl.append(docDesc)
            docEl.append(docArgHead)
            var argsEl = $(document.createElement('ul'))
            doc.args.map(function(arg) {
                var argEl = $(document.createElement('li'))
                var string = arg.name ? '<b>' + arg.name + '</b>: ' : ''
                argEl.html(string + arg.desc)
                argsEl.append(argEl)
            })
            docEl.append(argsEl)
            return docs.append(docEl)
        });
        $('body').append(docs)
    }

    var inputChange = function() {
        var textIn = input.value
        console.log("New Evaluation!")

        var outputRemainingSteps = function(outputs, functions) {
            if (!outputs.length)
                return
            var result = core.functionRunner(functions, textIn);
            // write to the DOM
            $(_.first(outputs)).html(result)

            // write to the console.
            console.log(result)

            outputRemainingSteps(_.rest(outputs), _.initial(functions))
        }

        outputRemainingSteps(outputs, core.allFunctions)
    }

    $(input).keyup(inputChange);
})()
