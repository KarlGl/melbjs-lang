/*
    These are end to end tests, of the whole language.
*/

var app = require('../js/core.js');
var sinon = require('../bower_components/sinon/lib/sinon.js');

describe('alternate syntax', function() {
    it('1+1', function() {
        expect(app.run('+\n  1\n  1')).toEqual(2)
    });
    it('embedded expressions', function() {
        expect(app.run('+\n  +\n    2\n    2\n  1')).toEqual(5)
    });
})

describe('variables', function() {

    it('assignment', function() {
        app.run('(=,1,1)')
        expect(app.subroutines.functions['1']).toEqual('1')
    });

    it('asign, retrieve', function() {
        expect(app.run('(=,1,1)(@,1)')).toEqual(1)
    });
});

describe('math', function() {

    it('multiply', function() {
        expect(app.run('(*,1,2,2)')).toEqual(4)
    });

    it('divide', function() {
        expect(app.run('(/,4,2,2)')).toEqual(1)
    });

});

describe('functions', function() {

    it('call function', function() {
        app.subroutines.functions['1'] = function(args, evalFun) {
            return args[0];
        };
        expect(app.run('(.,(@,1),1)')).toEqual(1)
    });

    it('define and call function', function() {
        expect(app.run('(.,(`,(+,1,1)))')).toEqual(2);
    });

    it('wont evaluate function body when being definied', function() {
        spy = sinon.spy(app.subroutines.functions, '+');
        app.run('(`,(+,1,1))')
        expect(spy.callCount).toEqual(0)
        app.subroutines.functions['+'].restore();
    });

    it('define and call function with argument', function() {
        expect(app.run('(.,(`,(&,a),a),2)')).toEqual(2);
    });

});
describe('logic', function() {

    it('if', function() {
        expect(app.run('(?,1,1,0)')).toEqual(1)
    });

    it('else', function() {
        expect(app.run('(?,false,1,0)')).toEqual(0)
    });

    it('less than', function() {
        expect(app.run('(<,2,1)')).toEqual(false)
    });

    it('if statement will evaluate the ACTIVE branch', function() {
        spy = sinon.spy(app.subroutines.functions, '=');
        app.run('(?,true,(=,1,1),1')
        // assigning 1 to 1 should not be processed, it's on a false branch!
        expect(spy.callCount).toEqual(1)
        spy.restore();
    });

    it('if statement WONT evaluate the NON ACTIVE branch', function() {
        spy = sinon.spy(app.subroutines.functions, '=');
        app.run('(?,true,1,(=,1,1)')
        // assigning 1 to 1 should not be processed, it's on a false branch!
        expect(spy.callCount).toEqual(0)
        spy.restore();
    });

    it('evaluate IN if CONDITION', function() {
        expect(app.run(
            "(?,(<,2,1),1,0)"
        )).toEqual(0)
    });

    it('evaluate arguments in if condition, deeper argument varialbe lookup', function() {
        expect(app.run(
            "(=,f,(`,(?,(<,(&,a),1),1,0),a))(.,(@,f),2)"
        )).toEqual(0)
    });

});

describe('example programs', function() {

    it('assign function to var and call it', function() {
        expect(app.run("(=,add one,(`,(+,(&,a),1),a))(.,(@,add one),2)"))
            .toEqual(3)
    });

    var factorialProg =
        "(=,f,(`,(?,(<,(&,a),2),1,(*,(&,a),(.,(@,f),(-,(&,a),1)))),a))(.,(@,f)"
    
    it('factorial of 0', function() {
        expect(app.run(factorialProg + ",0)")).toEqual(1)
    });
    it('factorial of 1', function() {
        expect(app.run(factorialProg + ",1)")).toEqual(1)
    });
    // it('factorial of 2', function() {
    //     expect(app.run(factorialProg + ",2)")).toEqual(2)
    // });
    // it('factorial of 3', function() {
    //     expect(app.run(factorialProg + ",3)")).toEqual(6)
    // });
    it('factorial of 4', function() {
        expect(app.run(factorialProg + ",4)")).toEqual(24)
    });
    
})
