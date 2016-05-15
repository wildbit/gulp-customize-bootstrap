var gulp = require('gulp');
var less = require('gulp-less');
var customizeBootstrap = require('../../');

// An example of how you can customize bootstrap 3's less files

gulp.task('compileBootstrap', function() {
  return gulp.src('node_modules/bootstrap/less/bootstrap.less')
    .pipe(customizeBootstrap('styles/less/*.less'))
    .pipe(less())
    .pipe(gulp.dest('styles/'));
});

gulp.task('default', ['compileBootstrap']);