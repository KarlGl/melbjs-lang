var app = require('../js/core.js');
var sinon = require('../bower_components/sinon/lib/sinon.js');

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
    it('if statement will evaluate the active branch', function() {
        spy = sinon.spy(app.subroutines.functions, '=');
        app.run('(?,true,(=,1,1),1')
        // assigning 1 to 1 should not be processed, it's on a false branch!
        expect(spy.callCount).toEqual(1)
        spy.restore();
    });
    it('if statement wont evaluate the non active branch', function() {
        spy = sinon.spy(app.subroutines.functions, '=');
        app.run('(?,true,1,(=,1,1)')
        // assigning 1 to 1 should not be processed, it's on a false branch!
        expect(spy.callCount).toEqual(0)
        spy.restore();
    });
    it('define and call function', function() {
        expect(app.run('(.,(`,(+,1,1)))')).toEqual(2);
    });
    it('wont call function body when definied', function() {
        spy = sinon.spy(app.subroutines.functions, '+');
        app.run('(`,(+,1,1))')
        expect(spy.callCount).toEqual(0)
        app.subroutines.functions['+'].restore();
    });
    it('define function with argument', function() {
        expect(app.run('(.,(`,(+,(*,a),1),a),2)')).toEqual(3);
    });
})
