var app = require('../js/app.js');
var l = function(c) {
    console.log(c)
}
describe('Full stack', function() {
    it('doubles', function() {
        expect(app.karl('`double,3')).toEqual(6)
    })
    it('does addition', function() {
	    expect(app.karl('`addition,{left:10,right:5}')).toEqual(15)
	  })
})

// describe("Lexer", function() {
//     it("regognizer", function() {
//         expect(lexer.isOperator('*')).toBe(true);
//         expect(lexer.isOperator(' *')).toBe(true);
//         expect(lexer.isWhiteSpace(' ')).toBe(true);
//         expect(lexer.isWhiteSpace(' *')).toBe(true);
//         expect(lexer.isIdentifier('g')).toBe(true);
//         expect(lexer.isIdentifier('*')).toBe(false);
//         expect(lexer.isWhiteSpace('\
//         	')).toBe(true);
//         expect(lexer.isWhiteSpace('\n')).toBe(true);
//         expect(lexer.isDigit('1')).toBe(true);
//     });
//     it("builder", function() {
//         expect(lexer.lex("*")[0].value).toEqual("*");
//         expect(lexer.lex("g")[0].value).toEqual("g");
//         expect(lexer.lex("ga")[0].value).toEqual("ga");
//         expect(lexer.lex("ga*")[0].value).toEqual("ga");
//         expect(lexer.lex("g")[0].type).toEqual("identifier");
//     });
// });
