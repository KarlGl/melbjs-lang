var app = require('../js/core.js');

describe('Full stack', function() {
    it('assignment', function() {
        app.run('(=,1,1)')
        expect(app.subroutines.functions['1']).toEqual('1')
    });
})
