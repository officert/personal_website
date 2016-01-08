'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const watch = require('gulp-watch');

const child_process = require('child_process');

gulp.task('run', [], function(next) {
  return child_process.spawn('bundle', ['exec', 'jekyll', 'serve'], {
      stdio: 'inherit'
    })
    .on('close', next);
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
  }, function() {
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
