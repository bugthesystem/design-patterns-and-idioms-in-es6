var SOURCE_MAP = /\.map$/;

function findFile(files, path) {
  for (var i = 0, ii = files.length; i < ii; i++) {
    if (files[i].path === path) {
      return files[i];
    }
  }

  return null;
}

function createSourceMapsPlugin(emitter, basePath, logger) {
  var log = logger.create('sourcemaps');

  emitter.on('file_list_modified', function(filesPromise) {
    filesPromise.then(function(files) {
      files.served.forEach(function(file) {
        if (SOURCE_MAP.test(file.path)) {
          var sourceMap = JSON.parse(file.content);

          if (!sourceMap) {
            log.warn('Invalid source map file', file.originalPath);
            return;
          }

          var sourceFile = findFile(files.served, basePath + '/' + sourceMap.file);

          if (!sourceFile) {
            log.warn('Can not find source file for map', file.originalPath);
            return
          }

          sourceMap.sourceRoot = basePath;
          sourceFile.sourceMap = sourceMap;
        }
      });
    });
  });
}

createSourceMapsPlugin.$inject = ['emitter', 'config.basePath', 'logger'];

module.exports = {
  'framework:sourcemaps': ['factory', createSourceMapsPlugin]
};
