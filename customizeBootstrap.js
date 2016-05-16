var path = require('path');
var _ = require('lodash');

module.exports = {
  create: function(config) {
    // TODO: validate config

    // config = {
    //   srcPath: '',                  // The path of the source manifest
    //   srcContent: '',               // Content of the source manifest
    //   overrideFiles: [],            // Array of override includes
    //   overridePath: ''              // Path of override files
    // }

    var existingManifest = this.parseExistingManifest(config.srcContent);
    return this.processNewManifest(existingManifest, config);
  },

  parseExistingManifest: function(content) {
    var pattern = /@import "([\w\.-]+)";/g;
    var manifest = [];
    var match;

    // Match and store import statements
    while ((match = pattern.exec(content)) !== null) {
      manifest.push(match[1]);
    }

    // return manifest;
    return manifest;
  },

  processNewManifest: function(content, config) {
    var overridePrefix = path.relative(config.srcPath, config.overridePath);

    // Iterate through manifest files
    return content.map(function(filename) {
      // Check if overrides matches manifest file
      var prefix = _.includes(config.overrideFiles, filename) ? overridePrefix : './';

      return '@import "' + path.join(prefix, filename) + '";';
    }).join('\n');
  }

};
