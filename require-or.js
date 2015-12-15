function requireOrFactory (require) {
    return function (id, callback) {
        if (callback && typeof callback !== 'function') {
            throw new Error('Second argument must be a function.');
        }
        try {
            return require(id);
        } catch (e) {
            var result;
            if (e.code !== 'MODULE_NOT_FOUND') {
                throw e;
            }
            if (callback) {
                result = callback();
            }
            return result;
        }
    };
}

module.exports = function (id, callback) {
    if (arguments.length === 1 && typeof arguments[0] === 'function') {
        return requireOrFactory(arguments[0]);
    }
    if (id.substr(0, 1) === '.') {
        throw new Error(
            'Relative paths are not supported, when require has not been passed to require-or.'
        );
    }

    return requireOrFactory(require)(id, callback);
};
