var lexer = require('../js/lexer.js');
describe("Lexer", function() {
    it("regognizer", function() {
        expect(lexer.isOperator('*')).toBe(true);
        expect(lexer.isOperator(' *')).toBe(true);
        expect(lexer.isWhiteSpace(' ')).toBe(true);
        expect(lexer.isWhiteSpace(' *')).toBe(true);
        expect(lexer.isWhiteSpace('\
        	')).toBe(true);
        expect(lexer.isWhiteSpace('\n')).toBe(true);
        expect(lexer.isDigit('1')).toBe(true);
    });
    it("builder", function() {
        expect(lexer.lex("ab")).toEqual(['a', 'b']);
    });
});
