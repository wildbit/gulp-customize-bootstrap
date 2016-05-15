var gulp = require('gulp');
var customizeBootstrap = require('../../');

// An example of how you can customize bootstrap 4's Sass files

gulp.task('customizeBootstrap', function() {
  return gulp.src('styles/scss/*.scss')
    .pipe(customizeBootstrap({
        manifest: 'node_modules/bootstrap/scss/bootstrap.scss',
        dest: 'styles/bootstrap.scss'
      }
    ))
});

gulp.task('default', ['customizeBootstrap']);