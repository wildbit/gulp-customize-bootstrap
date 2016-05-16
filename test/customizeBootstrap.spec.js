var assert = require('assert');
var customizeBootstrap = require('../customizeBootstrap.js');
var _ = require('lodash');

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
      overrideFiles: [],
      overridePath: 'styles/less/',
      srcPath: 'node_modules/bootstrap/less/'
    };

    it('Should set variables.less as override', function(done) {
      var configUno = _.cloneDeep(config);
      configUno.overrideFiles.push('variables.less');
      var expectedUno = '@import "normalize.less";\n' +
        '@import "../../../styles/less/variables.less";\n' +
        '@import "mixins.less";';

      assert.deepEqual(customizeBootstrap.processNewManifest(existingManifest, configUno), expectedUno);
      done();
    });

    it('Should set variables and normalize as overrides', function(done) {
      var configDos = _.cloneDeep(config);
      configDos.overrideFiles.push('variables.less');
      configDos.overrideFiles.push('normalize.less');
      var expectedDos = '@import "../../../styles/less/normalize.less";\n' +
        '@import "../../../styles/less/variables.less";\n' +
        '@import "mixins.less";';

      assert.deepEqual(customizeBootstrap.processNewManifest(existingManifest, configDos), expectedDos);
      done();
    });

    it('Should set no overrides', function(done) {
      var configTres = _.cloneDeep(config);
      var expectedTres = '@import "normalize.less";\n' +
        '@import "variables.less";\n' +
        '@import "mixins.less";';

      assert.deepEqual(customizeBootstrap.processNewManifest(existingManifest, configTres), expectedTres);
      done();
    });
  });

});