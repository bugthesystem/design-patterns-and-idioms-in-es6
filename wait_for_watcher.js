// Wait for any outstanding Traceur watchers.
// Hack to work-around https://youtrack.jetbrains.com/issue/WEB-14104

// How it works?
// WebStorm Traceur watcher writes LOCK_FILE when running and delete LOCK_FILE once all watchers are finished.
// WebStorm Karma configuration waits for this process to finish (i.e. till the LOCK_FILE is removed).

var fs = require('fs');
var LOCK_FILE = '.atscriptwatcher';
var START_DELAY = 500;

setTimeout(function() {
  if (!fs.existsSync(LOCK_FILE)) {
    // Watcher was not running.
    process.exit(0);
  }

  fs.watch(LOCK_FILE, function() {
    if (!fs.existsSync(LOCK_FILE)) {
      // All watchers have finished.
      process.exit(0);
    }
  });
}, START_DELAY);


