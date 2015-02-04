var gulp = require('gulp');
var traceur = require('gulp-traceur');
var connect = require('gulp-connect');
var rename_ = require('gulp-rename');

var TRACEUR_OPTIONS = require('./config').traceur;
var PATH = {
  BUILD: './build/',
  SRC: './src/**/*.ats'
};

// A wrapper around gulp-rename to support `dirnamePrefix`.
function rename(obj) {
  return rename_(function(parsedPath) {
    return {
      extname: obj.extname || parsedPath.extname,
      dirname: (obj.dirnamePrefix || '') + parsedPath.dirname,
      basename: parsedPath.basename
    };
  });
}


// TRANSPILE AT SCRIPT
gulp.task('build/src', function() {
  gulp.src(PATH.SRC, {base: '.'})
      // Rename before Traceur, so that Traceur has the knowledge of both input and output paths.
      .pipe(rename({extname: '.js', dirnamePrefix: PATH.BUILD}))
      .pipe(traceur(TRACEUR_OPTIONS))
      .pipe(gulp.dest('.'));
});

gulp.task('build', ['build/src']);

// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch(PATH.SRC, ['build']);
});


// WEB SERVER
gulp.task('serve', function() {
  connect.server({
    root: [__dirname],
    port: 8000,
    livereload: false
  });
});


gulp.task('default', ['serve', 'watch']);
