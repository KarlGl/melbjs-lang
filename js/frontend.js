var $ = require('../bower_components/jquery/jquery.js')
var _ = require('../bower_components/lodash/dist/lodash');
var core = require('./core')
var examples = require('./modules/examples')
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

    var input = $('#input')[0]
    
    var inputChange = function() {
        var textIn = input.value
        console.log("New Evaluation!")

        var outputRemainingSteps = function(outputs, functions) {
            if (!outputs.length)
                return
            var result = core.functionRunner(functions, textIn);
            // write to the DOM
            if (_.first(outputs))
                $(_.first(outputs)).html(result)

            // write to the console.
            console.log(result)

            outputRemainingSteps(_.rest(outputs), _.initial(functions))
        }

        outputRemainingSteps([outputDiv, null, null, null], core.allFunctions)
    }

    $(input).keyup(inputChange);

    styleForCode(document.body);
    document.body.style.color = 'white'
    document.body.style.backgroundColor = 'black'
    styleForCode(input)
    input.style.width = "50%"
    input.style.height = "50%"
    input.style.backgroundColor = "purple"
    input.style.color = "white"

    // core.allFunctions.map(function() {
    var outputDiv = document.createElement('div')
    window.document.body.appendChild($('<br>')[0])
    window.document.body.appendChild($('<br>')[0])
    window.document.body.appendChild($('<br>')[0])
    window.document.body.appendChild(outputDiv)
    outputDiv.style.fontSize = '23px'
    outputDiv.style.fontWeight = '800'
    outputDiv.style.color = 'gold'
    // })


    var examplesCt = $(document.createElement('div'))
    examplesCt.append($('<h2>Examples:</h2>'))
    _.forEach(examples.all, function(val) {
        var docEl = $(document.createElement('div'))
        var docName = $(document.createElement('h3'))
        var docDesc = $(document.createElement('div'))
        var docCode = $(document.createElement('pre'))
        docCode.css('color', 'pink');
        if (val.name) {
            docName.html(val.name)
        }
        if (val.desc)
            docDesc.html(val.desc)
        docCode.html(val.code)
        docEl.append(docName)
        docEl.append(docDesc)
        docEl.append(docCode)
        var runBtn = $(document.createElement('button'))
        runBtn.css('background-color', 'pink')
        runBtn.html("RUN")
        runBtn.click(function() {
            $(input).val(val.code)
            inputChange()
        })
        docEl.append(runBtn)
        examplesCt.append(docEl)
    });
    $('body').append(examplesCt)

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

})()
