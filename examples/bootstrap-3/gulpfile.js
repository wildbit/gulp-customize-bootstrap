var gulp = require('gulp');
var customizeBootstrap = require('../../');

// An example of how you can customize bootstrap 3's less files

gulp.task('customizeBootstrap', function() {
  return gulp.src('styles/less/*.less')
    .pipe(customizeBootstrap({
        manifest: 'node_modules/bootstrap/less/bootstrap.less',
        dest: 'styles/bootstrap.less'
      }
    ))
});

gulp.task('default', ['customizeBootstrap']);