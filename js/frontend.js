var $ = require('../bower_components/jquery/jquery.js')
var core = require('./core')

exports.init = (function() {

    var input = document.createElement('textarea')
    var output = document.createElement('div')

    window.document.body.appendChild(input)
    window.document.body.appendChild(output)

    var inputChange = function() {
        var textIn = input.value
        $(output).html(
            core.karl(textIn))
    }
    $(input).keyup(inputChange);
})()
