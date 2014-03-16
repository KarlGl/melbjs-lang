var $ = require('../bower_components/jquery/jquery.js')
var _ = require('../bower_components/lodash/dist/lodash');
var core = require('./core')
var nativeFunctions = require('./native_functions');

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

    var docs = $(document.createElement('div'))
    docs.append($('<h2>Built in functions:</h2>'))

    nativeFunctions.docs.map(function(doc) {
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

    var examples = document.createElement('div')
    $(examples).html("<h2>Examples</h2><pre>do addition with \nthe left with \ndo double with 1 \nand right with \n2 . </pre> Output: 4")
    window.document.body.appendChild(examples)

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
