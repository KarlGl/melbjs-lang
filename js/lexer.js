var lodash = require('../bower_components/lodash/dist/lodash');
exports.isOperator = function(c) {
    return /[+\-*\/\^%=(),]/.test(c);
}
exports.isDigit = function(c) {
    return /[0-9]/.test(c);
}
exports.isWhiteSpace = function(c) {
    return /\s/.test(c);
}
exports.isIdentifier = function(c) {
    // return typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c);
}
exports.lex = function(input) {
    return lodash.map(input, function(c) {
        return c;
    });
};
