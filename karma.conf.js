// Karma configuration
// Generated on Fri Mar 14 2014 15:01:19 GMT-0700 (PDT)

var traceurOptions = require('./config').traceur;

module.exports = function(config) {

  var isWebstorm = /karma-intellij/.test(process.argv[1]);
  var files;

  if (isWebstorm) {
    // Running within WebStorm - WebStorm takes care of transpiling.
    // Serve already transpiled files, including source maps.
    files = [
      {pattern: 'build/src/**/*.js', included: false},
      {pattern: 'build/test/**/*.js', included: false},
      {pattern: 'build/src/**/*.map', included: false},
      {pattern: 'build/test/**/*.map', included: false}
    ];
  } else {
    // Running outside WebStorm (eg. from commandline).
    // Karma transpiles the *.ats sources with karma-traceur-preprocessor.
    files = [
      {pattern: 'src/**/*.ats', included: false},
      {pattern: 'test/**/*.ats', included: false}
    ];
  }

  config.set({
    frameworks: ['jasmine', 'requirejs', 'traceur', 'sourcemaps'],

    files: [
      // The entry point that dynamically imports all the specs.
      {pattern: 'test/main.js', included: true},

      // The runtime assertion library.
      {pattern: 'node_modules/rtts-assert/dist/amd/assert.js', included: false}
    ].concat(files),

    preprocessors: {
      '**/*.ats': ['traceur']
    },

    browsers: ['Chrome'],

    traceurPreprocessor: {
      options: traceurOptions,
      transformPath: function(path) {
        // Traceur preprocessor is only used when running Karma outside of WebStorm.
        // We change the path to `build/**` so that the paths are the same as with WebStorm.
        return path.replace(config.basePath, config.basePath + '/build')
                   .replace(/\.ats$/, '.js');
      }
    }
  });

  config.plugins.push(require('./karma_sourcemaps'));
};
