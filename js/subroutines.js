var _ = require('../bower_components/lodash/dist/lodash');

exports.functions = {
    '+': function(args) {
        return "(" +
            _.rest(args).join('+') + ")";
    },
    '=': function(args) {
        exports.functions[args[1]] = args[2];
    },
}
