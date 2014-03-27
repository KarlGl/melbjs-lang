var app = require('../js/core.js');

describe('Full stack', function() {
    it('assignment', function() {
        app.run('(=,1,1)')
        expect(app.subroutines.functions['1']).toEqual('1')
    });
    it('asign, retrieve', function() {
        expect(app.run('(=,1,1)\n(@,1)')).toEqual(1)
    });
    it('call function', function() {
        app.subroutines.functions['1'] = function(args, evalFun) {
            return args[0];
        };
        expect(app.run('(.,(@,1),1)')).toEqual(1)
    });
    it('if', function() {
        expect(app.run('(?,1,1,0)')).toEqual(1)
    });
    it('else', function() {
        expect(app.run('(?,false,1,0)')).toEqual(0)
    });
    it('if statement wont evaluate the non active branch', function() {
        var called = false;
        // mock
        app.subroutines.functions['='] = function() {
            called = true;
        }
        app.run('(?,true,1,(=,1,1)')
        // assigning 1 to 1 should not be processed, it's on a false branch!
        expect(called).toEqual(false)
    });
    it('define and call function', function() {
        expect(app.run('(.,(`,(+,1,1)))')).toEqual(2);
    });
    it('wont call function body when definied', function() {
        var called = false;
        // mock
        app.subroutines.functions['+'] = function() {
            called = true;
        }
        app.run('(`,(+,1,1))')
        expect(called).toEqual(false)
    });
})
