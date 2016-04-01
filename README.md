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

Relative paths works as well:

```js
var maybeSomeModule = requireOr('../some-module', function () {
    // ...
});
```

## Why?

There is multiple other modules trying to solve the same problem.

- [optional](https://github.com/tony-o/node-optional)
- [try-require](https://github.com/rragan/try-require)

Both solve the problem of squelching errors, but it does not give you any
improvements over vanilla require for the cases where you want to handle the
fall back case.

## License

This module is made public under the ISC License.

See the [LICENSE](https://github.com/gustavnikolaj/require-or/blob/master/LICENSE)
file for additional details.
