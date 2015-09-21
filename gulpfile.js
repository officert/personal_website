var gulp = require('gulp');
var less = require('gulp-less');
var sh = require('shelljs');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var child_process = require('child_process');
var spawn = require('child_process').spawn;

gulp.task('run', [], function(next) {
  child_process.exec('bundle exec jekyll serve --baseurl \'\'');
  return next();

  // var jekyll = spawn('bundle exec jekyll serve', ['--baseurl', ''], {
  //   stdio: 'inherit'
  // });
  //
  // jekyll.on('exit', function(code) {
  //   return next(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  // });
});

gulp.task('css', [], function() {
  gulp.src('_less/main.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', ['css'], function() {
  console.log('watching css...');

  watch('_less/*.less', {
    emit: 'one',
    emitOnGlob: false
  }, function(files) {
    console.log('css updated...');
    return gulp.src('_less/main.less')
      .pipe(less())
      .pipe(gulp.dest('css'))
      .pipe(browserSync.reload({
        stream: true
      }));
  });
});

/**
 * Run all steps in order
 */
gulp.task('default', ['watch', 'run']);
