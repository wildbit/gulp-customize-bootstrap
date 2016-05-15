var path = require('path');
var _ = require('lodash');

module.exports = function(config) {
  // config = {
  //   srcPath: '',                  // The path of the source manifest
  //   srcContent: '',               // Content of the source manifest
  //   overrideFiles: [],            // Array of override includes
  //   overridePath: ''              // Path of override files
  // }

  // Get bootstrap manifest files
  var manifest = parseManifest(config.srcContent);
  manifest = generateNewManifest(manifest, config.overrideFiles);


  // Read the bootstrap manifest
  function parseManifest(content) {

    var pattern = /@import "([\w\.-]+)";/g;
    var manifest = [];
    var match;

    while ((match = pattern.exec(content)) !== null) {
      manifest.push(match[1]);
    }

    return manifest;
  }

  // Find matches between overrides and manifest
  function generateNewManifest(manifest, overrides) {
    var overridePrefix = path.relative(config.srcPath, config.overridePath);

    // Iterate through manifest files
    return manifest.map(function(filename) {
      // Check if overrides matches manifest file
      var prefix = _.includes(overrides, filename) ? overridePrefix : './';

      return '@import "' + path.join(prefix, filename) + '";';
    }).join('\n');
  }

  return manifest
};
