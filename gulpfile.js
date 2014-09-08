/* =========================================================================
 *
 *   Dependencies
 *
 * ========================================================================= */
var gulp = require('gulp');
var watch = require('gulp-watch');
var ENV = process.env.NODE_ENV || 'development';
var appConfig = require(__dirname + '/config/appConfig')[ENV];
var clean = require('gulp-clean');
var less = require('gulp-less');
var annotate = require('gulp-ng-annotate');
var replace = require('gulp-replace');
var uglify = require('gulp-uglifyjs');
var htmlReplace = require('gulp-html-replace');
var gulpIf = require('gulp-if');

//ENV = 'production';

/* =========================================================================
 *
 *   Constants
 *
 * ========================================================================= */
var BUILDDIR = 'build';
//js
var UGLIFYOPTIONS = {
  mangle: ENV === 'production',
  compress: ENV === 'production',
  output: {
    beautify: ENV !== 'production'
  }
};
var MINIFIEDSCRIPT = 'website.min.js';
//css
var LESSOPTIONS = {
  compress: ENV === 'production'
};

/* =========================================================================
 *
 *   Tasks
 *
 * ========================================================================= */
gulp.task('default', ['clean', 'copy', 'replace', 'css', 'js']);

/**
 * Clean the build directory
 */
gulp.task('clean', function(next) {
  return _init(gulp.src('build/*.*', {
      read: false
    }))
    .pipe(clean());
});

/**
 * Copy src folder to build directory
 */
gulp.task('copy', ['clean'], function(next) {
  //copies everything except less and js which are handled by the css and js tasks
  return _init(gulp.src('src/**/**/*.*'))
    .pipe(gulp.dest(BUILDDIR));
});

/**
 * Replace vars in config
 */
gulp.task('replace', ['copy'], function() {
  return _replace(gulp.src(BUILDDIR + '/**/*'))
    .pipe(gulp.dest(BUILDDIR));
});

/**
 * Compile less to css
 */
gulp.task('css', function() {
  return gulp.src('src/less/site.less')
    .pipe(less(LESSOPTIONS))
    .pipe(gulp.dest(BUILDDIR + '/css'));
});

/**
 * Minify js
 */
gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(annotate())
    .pipe(uglify(MINIFIEDSCRIPT, UGLIFYOPTIONS))
    .pipe(gulp.dest(BUILDDIR + '/js'));
});

gulp.task('server', ['default'], function() {

  (function processLess() {
    console.log('watching less files');

    watch({
      glob: 'src/less/**/*.less',
      emit: 'one',
      emitOnGlob: false
    }, function(files) {
      files
        .pipe(less(LESSOPTIONS))
        .pipe(gulp.dest(BUILDDIR + '/css'));
    });
  }());

  (function processJs() {
    console.log('watching js files');

    watch({
      glob: 'src/js/**/**/*.js',
      emit: 'one',
      emitOnGlob: false
    }, function(files) {
      _replace(files)
        .pipe(annotate())
        .pipe(uglify(MINIFIEDSCRIPT, UGLIFYOPTIONS))
        .pipe(gulp.dest(BUILDDIR + '/js'));
    });
  }());

  (function processHtml(paths) {
    console.log('watching html files');

    paths.forEach(function(path) {

      watch({
        glob: path,
        emit: 'one',
        emitOnGlob: false
      }, function(files) {
        _replace(files)
          .pipe(gulp.dest(BUILDDIR + '/js'));
      });

    });
  }(['src/js/**/**/*.html', 'src/*.html']));

  return require(__dirname + '/server');
});

/* =========================================================================
 *
 *   Helper Functions
 *
 * ========================================================================= */

function _init(stream) {
  //stream.setMaxListeners(0);
  return stream;
};

function _replace(stream) {
  _init(stream);
  for (key in appConfig) {
    stream.pipe(gulpIf(_isJsFile, replace('@@' + key, appConfig[key], {
      skipBinary: true
    })));
  }

  _htmlReplace(stream);

  return stream;
};

function _htmlReplace(stream) {

  if (ENV === 'production') {
    stream.pipe(gulpIf(_isHtmlFile, htmlReplace({
      devscripts: '<script src="/js/' + MINIFIEDSCRIPT + '"></script>'
    })));
  }

  return stream;
};

function _isJsFile(file) {
  return _endsWith(file.path, '.js');
};

function _isHtmlFile(file) {
  return _endsWith(file.path, '.html');
};

function _endsWith(s, suffix) {
  return s.indexOf(suffix, s.length - suffix.length) !== -1;
};
