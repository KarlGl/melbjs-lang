var _ = require('../bower_components/lodash/dist/lodash');
var core = require('./core');

var truthy = function(c) {
    return (typeof(c) !== 'undefined' && c !== '0' && c !== 'false' && c !== false && c !== null)
}


// All funcs are called with the first argument as thier name.
exports.functions = {
    '+': function(args, evalLeaf) {
        return "(" +
            args.map(evalLeaf).join('+') + ")";
    },
    '=': function(args, evalLeaf) {
        exports.functions[evalLeaf(args[0])] = evalLeaf(args[1]);
        return "";
    },
    // lookup what is stored in a var
    '@': function(args, evalLeaf) {
        return exports.functions[evalLeaf(args[0])];
    },
    // call
    '.': function(args, evalLeaf) {
        return evalLeaf(args[0]).call(this, _.rest(args).map(evalLeaf));
    },
    // if
    '^': function(args, evalLeaf) {
        return truthy(evalLeaf(args[0])) ? evalLeaf(args[1]) : evalLeaf(args[2]);
    },
    // def
    '`': function(args, evalLeaf) {
        return function(funcParams) {
            // Stop this from being pre evaluated.
            // Stop this from running without the params being set.

            return core.functionRunner([core.lexer, core.parser, core.compiler], evalLeaf(args[0]));

        };
    },
}
