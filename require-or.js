var path = require('path');

var parentRequire = module.parent.require;
var parentDirname = path.dirname(module.parent.filename);

module.exports = function (id, callback) {
    if (callback && typeof callback !== 'function') {
        throw new Error('Second argument must be a function.');
    }
    try {
        if (id.substr(0, 1) === '.') {
            return require(path.resolve(parentDirname, id));
        }
        return parentRequire(id);
    } catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            throw e;
        }
        if (callback) {
            return callback();
        }
    }
};
