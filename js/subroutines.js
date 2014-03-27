var _ = require('../bower_components/lodash/dist/lodash');
var core = require('./core');

var truthy = function(c) {
    return (typeof(c) !== 'undefined' && c !== '0' && c !== 'false' && c !== false && c !== null)
}

// What to return if your function has no retrurn value. Can't use undefined because it will cast to string "undefined".
var nothing = "";

var coreFunctions = {
    math: {
        '+': function(args, evalLeaf) {
            return args.length ?
                "(" + args.map(evalLeaf).join('+') + ")" :
                nothing;
        },
    },

    output: {
        // log
        '~': function(args, evalLeaf) {
            console.log(args.map(evalLeaf).join(', '));
            return nothing;
        },
    },

    storage: {
        '=': function(args, evalLeaf) {
            exports.functions[evalLeaf(args[0])] = evalLeaf(args[1]);
            return nothing;
        },
        // lookup what is stored in a var
        '@': function(args, evalLeaf) {
            return exports.functions[evalLeaf(args[0])];
        },
    },

    logic: {
        // if
        '?': function(args, evalLeaf) {
            return truthy(evalLeaf(args[0])) ? evalLeaf(args[1]) : evalLeaf(args[2]);
        },
    },

    functions: {
        // call
        '.': function(args, evalLeaf) {
            // call the function with array of evaluated arguments.
            return evalLeaf(args[0]).call(this, _.rest(args).map(evalLeaf));
        },
        // define function
        // body, argument name 1, argument name 2, etc
        '`': function(args, evalLeaf) {
            functionBodyLeaf = args[0]
            return function(funcParams) {
                var localVars = {}
                _.rest(args).map(evalLeaf).forEach(function(argName, i) {return localVars[argName] = funcParams[i]})

                functionBodyLeaf['localVars'] = localVars
                return evalLeaf(args[0])
            };
        },
        // lookup what is stored in an argument
        '*': function(args, evalLeaf, parent) {
            return parent.localVars[evalLeaf(args[0])];
        },
    }
}

// Just put them all to the top level. first to an array of all namespaces, then reduce into one big object.
exports.functions = _.keys(coreFunctions)
    .map(function(key) {
        return coreFunctions[key];
    })
    .reduce(function(rt, obj) {
        return _.merge(rt, obj);
    }, {})
