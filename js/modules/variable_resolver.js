var _ = require('../../bower_components/lodash/dist/lodash');

// Resolve a var name checking the scope of all outer functions.
exports.VariableResolver = {
    run: function self(expression, varName) {
        // recursively call on parent if it doesn't have the var.
        // terminate with undefined if no more parents.
        return (expression.localVars && typeof(expression.localVars[varName]) !== 'undefined') ?
            expression.localVars[varName] :
            (expression.parent) ?
		            self(expression.parent, varName) : undefined
    }
}
