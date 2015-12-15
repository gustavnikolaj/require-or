var expect = require('unexpected');
var requireOr = require('../');

describe('require, or...', function () {
    it('exports a function', function () {
        return expect(requireOr, 'to be a function');
    });
});
