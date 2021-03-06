var expect = require('unexpected');
var requireOr = require('../');


function mockNodeModules(path) {
    process.env.NODE_PATH = path;
    require('module').Module._initPaths();
    return function revertMockNodeModules() {
        process.env.NODE_PATH = undefined;
        require('module').Module._initPaths();
    };
}

describe('require, or...', function () {
    it('should work like require', function () {
        var someModule = require('./fixtures/some-module');
        return expect(requireOr('./fixtures/some-module'), 'to equal', someModule);
    });
    it('should call the callback when the require fails', function () {
        return expect(function (cb) {
            requireOr('./missing/module', cb);
        }, 'to call the callback');
    });
    it('should not call the callback, when the require succeeds', function () {
        return expect(function () {
            requireOr('./fixtures/some-module', function () {
                throw new Error('Callback was called');
            });
        }, 'not to throw');
    });
    it('should not return the value from the callback', function () {
        var someModule = requireOr('./missing/module', function () {
            return { module: 'some-other-module' };
        });
        return expect(someModule, 'to have property', 'module', 'some-other-module');
    });
    it('should work when non-relative paths', function () {
        var someModule = require('./fixtures/some-module');
        var mockPath = require('path').resolve(__dirname, 'fixtures');
        var undoMock = mockNodeModules(mockPath);

        return expect(requireOr('some-module'), 'to equal', someModule).finally(undoMock);
    });
    it('should not catch non module errors', function () {
        return expect(function () {
            requireOr('./fixtures/module-with-error');
        }, 'to throw', 'string is not a function');
    });
    it('should not catch non module errors', function () {
        return expect(function () {
            requireOr('./fixtures/module-with-error', function () {
                throw new Error('Callback was called');
            });
        }, 'to throw', 'string is not a function');
    });
});
