# require or ...

Converts:

```js
var someModule;
try {
    someModule = require('module-that-might-fail');
} catch (e) {
    console.log('AARGH! Could not find someModule!');
}
```

... into:

```js
var requireOr = require('require-or');
var someModule = requireOr('module-that-might-fail', function () {
    console.log('AARGH! Could not find someModule!');
});
```

The callback will be executed synchroniously and a return value
will be returned from requireOr as well, allowing:

```js
var someModule = requireOr('some-module', function () {
    return require('some-fallback-module');
});
```

The callback is not mandatory, so if you just want to squelch the
error message, you don't need to provide it:

```js
var maybeSomeModule = requireOr('some-module');
```

If you want to use relative paths, you will need to pass in require. Otherwise
the path will not be resolved correctly.

```js
var requireOr = require('require-or')(require);
var maybeSomeModule = requireOr('../some-module', function () {
    // ...
});
```

## License

This module is made public under the ISC License.

See the [LICENSE](https://github.com/gustavnikolaj/require-or/blob/master/LICENSE)
file for additional details.
