# gulp-customize-bootstrap [![Build Status](https://travis-ci.org/wildbit/gulp-customize-bootstrap.svg?branch=master)](https://travis-ci.org/wildbit/gulp-customize-bootstrap)

A gulp plugin that overrides Bootstrap’s core Less or Sass files without modifying Bootstrap. This is a modified and extended version of [grunt-customize-bootstrap](https://github.com/ianwremmel/grunt-customize-bootstrap).

See our examples for [Bootstrap 3](https://github.com/wildbit/gulp-customize-bootstrap/tree/master/examples/bootstrap-3) and [Bootstrap 4](https://github.com/wildbit/gulp-customize-bootstrap/tree/master/examples/bootstrap-4).

## Install
```
npm install --save-dev gulp-customize-bootstrap
```

## Usage
This plugin works using Bootstrap’s npm, bower, or static file installs. Just make sure you pass in the correct Bootstrap less or sass file using `gulp.src`.


### Bootstrap 3 using Less

```js
var customizeBootstrap = require('gulp-customize-bootstrap');
var less = require('gulp-less');

gulp.task('compileBootstrap', function() {
  return gulp.src('node_modules/bootstrap/less/bootstrap.less')
    .pipe(customizeBootstrap('styles/less/*.less'))
    .pipe(less())
    .pipe(gulp.dest('styles/'));
});
```


### Bootstrap 4 using Sass

Make sure that Bootstrap 4 is installed.


npm – `npm install bootstrap@4.0.0-alpha.2`

Bower – `bower install bootstrap#v4.0.0-alpha.2`


```js
var customizeBootstrap = require('gulp-customize-bootstrap');
var sass = require('gulp-sass');

gulp.task('compileBootstrap', function() {
  return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(customizeBootstrap('styles/scss/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('styles/'));
});
```
