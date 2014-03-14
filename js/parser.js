var _ = require('../bower_components/lodash/dist/lodash');
var l = function(c) {
    console.log(c)
}
exports.parse = function(tokens) {
    return _.reduce(tokens, function(tree, token) {
        return tree.concat(token)
    }, []);
};
