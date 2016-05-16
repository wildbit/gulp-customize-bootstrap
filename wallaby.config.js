module.exports = function () {
  return {
    files: [
      'customizeBootstrap.js'
    ],

    tests: ['test/*.js'],

    env: {
      type: 'node'
    },

    testFramework: 'mocha'
  }
};