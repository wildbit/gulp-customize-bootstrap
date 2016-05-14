var through = require('through2');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-customize-bootstrap';

module.exports = function(bootstrapPath, opt) {
  if (!bootstrapPath) {
    throw new PluginError(PLUGIN_NAME, 'Missing bootstrap path! Install the package using `npm install bootstrap` then add `node_modules/bootstrap` to this plugin.');
  }

  opt = opt || {
      dest: 'bootstrap.less'
    };

  var overrides = [];
  var srcPath = '';
  var destPath = path.dirname(opt.dest) + '/';

  // Get bootstrap manifest files
  var manifest = parseManifest(path.join(bootstrapPath, 'less', 'bootstrap.less'));

  // Read the bootstrap manifest
  function parseManifest(filename) {
    try {
      var data = fs.readFileSync(filename, 'utf8');
    } catch(err) {
      throw new PluginError(PLUGIN_NAME, 'Bootstrap path is not valid. Install the package using `npm install bootstrap` then add `node_modules/bootstrap`.');
    }

    var pattern = /@import "([\w\.-]+)";/g;

    var manifest = [];
    var match;
    while ((match = pattern.exec(data)) !== null) {
      manifest.push(match[1]);
    }

    return manifest;
  }

  // Find matches between overrides and manifest
  function processManifest(manifest, overrides) {
    var overridePrefix = path.relative(destPath, srcPath);
    var origPrefix = path.relative(destPath, path.join(bootstrapPath, 'less'));

    // Iterate through manifest files
    var less = manifest.map(function(filename) {
      var prefix;

      // Check if overrides matches manifest file
      if (_.includes(overrides, filename)) {
        prefix = overridePrefix;
      } else {
        prefix = origPrefix;
      }

      return '@import "' + path.join(prefix, filename) + '";';
    }).join('\n');

    return less;
  }

  function bufferFile(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }
    if (srcPath === '') {
      srcPath = path.relative(path.basename(file.cwd),file.base).replace('../','')
    }

    overrides.push(path.basename(file.path));
    cb();
  }

  function endStream(cb) {
    manifest = processManifest(manifest, overrides);

    mkdirp(path.dirname(opt.dest), function (err) {
      if (err) {
        throw new PluginError(PLUGIN_NAME, 'There was an issue creating your destination file.');
      }

      fs.writeFile(opt.dest, manifest, function(err) {
        if (err) {
          throw new PluginError(PLUGIN_NAME, 'There was an issue creating your destination file.');
        }

        cb();
      });
    });
  }

  return through.obj(bufferFile, endStream);

};
