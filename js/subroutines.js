var _ = require('../bower_components/lodash/dist/lodash');
var core = require('./core');

// All funcs are called with the first argument as thier name.
exports.functions = {
    '+': function(args) {
        return "(" +
            _.rest(args).join('+') + ")";
    },
    '=': function(args) {
        // lvalue is ars[1]
        exports.functions[args[1]] = args[2];
        return "";
    },
    // lookup what is stored in a var
    '@': function(args) {
        return exports.functions[args[1]];
    },
    // call
    '.': function(args) {
	    	var argumentsArray = ['anonFunction'].concat(_.rest(_.rest(args)))
        return args[1].call(this, argumentsArray);
    },
    // if
    '^': function(args) {
        var truthy = function(c) {
            return (typeof(c) !== 'undefined' && c !== '0' && c !== 'false' && c !== false && c !== null)
        }

        return truthy(args[1]) ? args[2] : args[3];
    },
    // def
    '`': function(args) {
        return function(funcParams) {
        	// Stop this from being pre evaluated.
        	// Stop this from running without the params being set.

            return core.functionRunner([core.lexer, core.parser, core.compiler], args[1]);

        };
    },
}
