var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var Finder = require('fs-finder');
var PluginError = gutil.PluginError;
var customizeBootstrap = require('./customizeBootstrap');

const PLUGIN_NAME = 'gulp-customize-bootstrap';

module.exports = function(overrides) {
  if (typeof overrides === 'undefined') {
    throw new PluginError(PLUGIN_NAME, 'You must specify your stylesheet overrides. Check out the Github page usage instructions – https://github.com/wildbit/gulp-customize-bootstrap');
  }

  function bufferFile(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      var overrideFiles = Finder.in(path.dirname(overrides)).findFiles(path.basename(overrides));

      // Clean up path
      overrideFiles.forEach(function(item, index) {
        // If scss remove partial underscore and extension
        if (path.extname(file.path) === '.scss') {
          overrideFiles[index] = path.basename(item).replace('.scss', '').substr(1);
        } else {
          overrideFiles[index] = path.basename(item);
        }


        if (index === (overrideFiles.length-1)) {
          var newContent = customizeBootstrap.create({
            srcPath: path.relative(file.cwd,file.base),
            srcContent: file.contents.toString(),
            overrideFiles: overrideFiles,
            overridePath: path.dirname(overrides)
          });

          file.contents = new Buffer(newContent);

          cb(null, file);
        }
      });

    }

  }

  return through.obj(bufferFile);
};
