var gulp = require('gulp');
var sass = require('gulp-sass');
var customizeBootstrap = require('../../');

// An example of how you can customize bootstrap 4's Sass files

gulp.task('compileBootstrap', function() {
  return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(customizeBootstrap('styles/scss/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('styles/'));
});

gulp.task('default', ['compileBootstrap']);