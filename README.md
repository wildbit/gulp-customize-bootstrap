# gulp-customize-bootstrap
A gulp plugin that overrides Bootstrap's core LESS files without modifying Bootstrap.

## Install
```
npm install --save-dev gulp-customize-bootstrap
```

## Usage
Ensure that you have installed bootstraps npm package.

```
var gulp = require('gulp');
var customizeBootstrap = require('gulp-customize-bootstrap');

gulp.task('customizeBootstrap', function() {
  return gulp.src('styles/less/*.less')
    .pipe(customizeBootstrap('node_modules/bootstrap', {
        dest: 'styles/bootstrap.less'
      }
    ))
});

gulp.task('default', ['customizeBootstrap']);
```
