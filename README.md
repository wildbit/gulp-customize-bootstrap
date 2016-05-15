# gulp-customize-bootstrap
A gulp plugin that overrides Bootstrap's core Less or Sass files without modifying Bootstrap. This is a modified version of [grunt-customize-bootstrap](https://github.com/ianwremmel/grunt-customize-bootstrap).

See our examples for [Bootstrap 3](https://github.com/wildbit/gulp-customize-bootstrap/tree/master/examples/bootstrap-3) and [Bootstrap 4](https://github.com/wildbit/gulp-customize-bootstrap/tree/master/examples/bootstrap-4).

## Install
```
npm install --save-dev gulp-customize-bootstrap
```

## Usage
Ensure that you installed Bootstrap’s npm package. `npm install bootstrap --save`

### Include in gulpfile.js

```js
var customizeBootstrap = require('gulp-customize-bootstrap');
```


### Bootstrap 3 using Less

```js
gulp.task('customizeBootstrap', function() {
  return gulp.src('styles/less/*.less')
    .pipe(customizeBootstrap({
        manifest: 'node_modules/bootstrap/less/bootstrap.less',
        dest: 'styles/bootstrap.less'
      }
    ))
});
```

### Bootstrap 4 using Sass

Make sure that Bootstrap 4 installed. `npm install bootstrap@4.0.0-alpha.2`.

```js
gulp.task('customizeBootstrap', function() {
  return gulp.src('styles/scss/*.scss')
    .pipe(customizeBootstrap({
        manifest: 'node_modules/bootstrap/scss/bootstrap.scss',
        dest: 'styles/bootstrap.scss'
      }
    ))
});
```


## Options

### manifest
_string_ – The path to bootstrap’s original manifest stylesheet.
_Default:_ `node_modules/bootstrap/scss/bootstrap.less`

### dest
_string_ – The destination of your generated manifest file. Requires file extension.
_Default:_ `bootstrap.less`