var _ = require('../bower_components/lodash/dist/lodash');

exports.functions = {
    '+': function(args) {
        return "(" + 
        	_.rest(args).join('+')
         + ")";
    },
}
