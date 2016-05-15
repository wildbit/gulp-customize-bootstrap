var through = require('through2');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-customize-bootstrap';

module.exports = function(opt) {
  opt = opt || {
      manifest: 'node_modules/bootstrap/less/bootstrap.less',
      dest: 'bootstrap.less'
    };

  var overrides = [];
  var srcPath = '';
  var srcExt = '';
  var destPath = path.dirname(opt.dest) + '/';

  // Get bootstrap manifest files
  var manifest = parseManifest(opt.manifest);


  // Read the bootstrap manifest
  function parseManifest(filename) {
    try {
      var data = fs.readFileSync(filename, 'utf8');
    } catch(err) {
      throw new PluginError(PLUGIN_NAME, 'Bootstrap path is not valid. Check out the Github page usage instructions – https://github.com/wildbit/gulp-customize-bootstrap');
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
  function generateNewManifest(manifest, overrides) {
    var overridePrefix = path.relative(destPath, srcPath);
    var origPrefix = path.relative(destPath, path.dirname(opt.manifest));

    // Iterate through manifest files
    return manifest.map(function(filename) {
      // Check if overrides matches manifest file
      var prefix = _.includes(overrides, filename) ? overridePrefix : origPrefix;

      return '@import "' + path.join(prefix, filename) + '";';
    }).join('\n');
  }

  function isExtValid(sourceExt, destExt, manifestExt) {
    return destExt === sourceExt && manifestExt === sourceExt
  }

  function bufferFile(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }
    if (srcPath === '') {
      srcPath = path.relative(path.basename(file.cwd),file.base).replace('../','')
    }
    if (srcExt === '') {
      srcExt = path.parse(file.path).ext;
    }

    var filename;

    // Remove underscore character from Sass partials
    if (srcExt === '.scss' && path.basename(file.path).charAt(0) === '_') {
      filename = path.basename(file.path).substr(1).replace('.scss','');
    } else {
      filename = path.basename(file.path)
    }

    overrides.push(filename);
    cb();
  }

  function endStream(cb) {
    if (!isExtValid(srcExt, path.extname(opt.dest), path.extname(opt.manifest))) {
      throw new PluginError(PLUGIN_NAME, 'Extensions do not match for source files, manifest, or destination. Make sure they are all .scss or .less files.');
    }

    manifest = generateNewManifest(manifest, overrides);
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
