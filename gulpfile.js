'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var nested = require('postcss-nested');
var nesting = require('postcss-nesting');
var vars = require('postcss-simple-vars');
var gulpCopy = require('gulp-copy');
var clean = require('gulp-clean');
var zip = require('gulp-zip');

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('src/style/*.pcss', ['pcss']);
  gulp.watch('src/*.html', ['html']);
});

gulp.task('pcss', function(cb) {
  var processors = [
    vars(),
    nesting(),
    precss(),
    autoprefixer({
      browsers: ['last 1 version']
    })
  ];
  return gulp.src(['src/style/normilize.pcss', 'src/style/fonts.pcss', 'src/style/*.pcss'])
    .pipe(concat('bundle.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('src/css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('src/*.html')
    .pipe(connect.reload());
});

gulp.task('clean', ['pcss'], function() {
  return gulp.src(['dist/*'])
    .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
  return gulp.src(['src/css/*', 'src/js/*', 'src/img/*', 'src/svg/*', 'src/fonts/*', 'src/index.html'])
    .pipe(gulpCopy('dist', {
      prefix: 1
    }));
});

gulp.task('zip', ['copy'], function() {
  return gulp.src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['zip']);

gulp.task('server', ['connect', 'html', 'pcss', 'watch']);

gulp.task('default', ['server']);
