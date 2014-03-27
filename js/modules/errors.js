exports.throwIfFalse = function(test, msg) {
    if (!test) {
        throw {
            message: msg
        }
    }
    return test
}
