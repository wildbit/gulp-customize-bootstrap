var gulp = require('gulp');
var customizeBootstrap = require('../index');

gulp.task('customizeBootstrap', function() {
  return gulp.src('styles/less/*.less')
    .pipe(customizeBootstrap('node_modules/bootstrap', {
        dest: 'styles/bootstrap.less'
      }
    ))
});

gulp.task('default', ['customizeBootstrap']);