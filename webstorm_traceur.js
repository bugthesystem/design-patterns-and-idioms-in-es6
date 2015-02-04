var inputFilename = process.argv[2];
var outputFilename = process.argv[3] || inputFilename.replace(/\.ats$/, '.js');

var path = require('path');
var sourceRoot = path.relative(path.dirname(outputFilename), '');

var TraceurNodeCompiler = require('traceur/src/node/NodeCompiler').NodeCompiler;
var options = require('./config.json').traceur;
var compiler = new TraceurNodeCompiler(options);


// Increment the lock to delay Karma unit tests until all watchers are finished.
var LOCK_FILE = '.atscriptwatcher';
var fs = require('fs');

if (fs.existsSync(LOCK_FILE)) {
  var lockCount = parseInt(fs.readFileSync(LOCK_FILE).toString(), 10);
  lockCount++;
  fs.writeFileSync(LOCK_FILE, lockCount.toString());
} else {
  fs.writeFileSync(LOCK_FILE, '1');
}


// TODO(vojta): Fix this in Traceur instead.
// Traceur generates source map file in the CWD.
// This hacks Traceur to generate source map file in the output file directory, respecting the `sourceRoot` option.
var writeFile = require('traceur/src/node/file-util').writeFile;
compiler.writeTreeToFile = function(tree, filename) {
  filename = this.normalize(filename);
  // This is changed.
  // Pass sourceRoot to `this.write`. Traceur does not pass it through.
  var compiledCode = this.write(tree, filename, sourceRoot);
  if (this.options_.sourceMaps === 'file') {
    var sourcemap = this.getSourceMap();
    if (sourcemap) {
      // This is changed.
      // Generate the source map in the same folder as the output JS file.
      writeFile(filename.replace(/\.js$/, '.map'), sourcemap);
    }
  }

  writeFile(filename, compiledCode);
};


compiler.compileSingleFile(inputFilename, outputFilename, function(err) {
  console.error(err);
});

// Release/decrement the lock.
var lockCount = parseInt(fs.readFileSync(LOCK_FILE).toString(), 10);
lockCount--;

if (lockCount === 0) {
  fs.unlinkSync(LOCK_FILE);
} else {
  fs.writeFileSync(LOCK_FILE, lockCount.toString());
}
