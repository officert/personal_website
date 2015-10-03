var gulp = require('gulp');
var less = require('gulp-less');
var sh = require('shelljs');
var watch = require('gulp-watch');

var child_process = require('child_process');
var spawn = require('child_process').spawn;

gulp.task('run', [], function(next) {
  child_process.exec('bundle exec jekyll serve --baseurl \'\'', function() {
    console.log('finished run, listening on port:4000');
    return next(null);
  });
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
      .pipe(gulp.dest('css'));
  });
  //
  // console.log('watching html...');
  //
  // ['./*.html', './_includes/*.html', './_drafts/*.html', './_layouts/*.html', './_pages/*.html', './_posts/*.html'].forEach(function(path) {
  //   watch(path, {
  //     emit: 'one',
  //     emitOnGlob: false
  //   }, function(files) {
  //     console.log('html updated...');
  //     return child_process.exec('bundle exec jekyll serve --baseurl \'\' --no-watch');
  //   });
  // });
});

/**
 * Run all steps in order
 */
gulp.task('default', ['watch', 'run']);
