var assert = require('assert');
var customizeBootstrap = require('../customizeBootstrap.js');

describe('Customize Bootstrap', function() {

  describe('Parse existing manifest', function() {
    var manifestLess = '@import "normalize.less";\n' +
                       '@import "variables.less";\n';
    var expectedManifest = ['normalize.less', 'variables.less'];

    it('Should parse manifest filenames from same directory into array', function(done) {
      assert.deepEqual(customizeBootstrap.parseExistingManifest(manifestLess), expectedManifest);
      done();
    });
  });

  describe('Process new manifest', function() {
    var existingManifest = ['normalize.less', 'variables.less', 'mixins.less'];
    var config = {
      overrideFiles: [
        'variables.less'
      ],
      overridePath: 'styles/less/',
      srcPath: 'node_modules/bootstrap/less/'
    };

    var expectedManifest = '@import "normalize.less";\n' +
                           '@import "../../../styles/less/variables.less";\n' +
                           '@import "mixins.less";';

    it('Should parse manifest filenames from same directory into array', function(done) {
      assert.deepEqual(customizeBootstrap.processNewManifest(existingManifest, config), expectedManifest);
      done();
    });
  });

});