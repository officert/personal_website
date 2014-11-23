/* =========================================================================
 *
 *   Dependencies
 *
 * ========================================================================= */
var gulp = require('gulp');
var watch = require('gulp-watch');
var NODE_ENV = process.env.NODE_ENV || process.argv[3] || 'development';
var ENV = setupEnv(NODE_ENV);
var appConfig = require(__dirname + '/config/appConfig')[ENV];
var clean = require('gulp-clean');
var less = require('gulp-less');
var replace = require('gulp-replace');
var uglify = require('gulp-uglifyjs');
var htmlReplace = require('gulp-html-replace');
var gulpIf = require('gulp-if');

console.log('\n running in ' + ENV + ' environment \n');

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
      //copy the changes less files to the build dir
      files
        .pipe(gulp.dest(BUILDDIR + '/less'));

      //reprocess main.less in the build dir - regenerate css
      return gulp.src(BUILDDIR + '/less/site.less')
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
      return _replace(files)
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
        return _replace(files)
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
    stream.pipe(replace('@@' + key, appConfig[key], {
      skipBinary: true
    }));
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

function setupEnv(env) {
  // allow passing name as an argument
  if (env && env.indexOf('-') === 0) env = env.substring(1);

  // production
  if (env === 'master' || env === 'prod' || env === 'production') return 'production';
  // development
  else if (env === 'dev' || env === 'development') return 'development';
  // local
  else if (env === 'local') return 'local';
  // default
  else return 'development';
}
