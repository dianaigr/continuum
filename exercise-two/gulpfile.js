'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');

var paths = {
  src_sass: 'assets/scss/*.scss',
  dest_css : 'assets/css',
  src_html: '*.html',
  dest_html: ''
}

/* Compile SCSS files to CSS  === */
gulp.task('sass', function () {
  return gulp.src(paths.src_sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(csso())
    .pipe(gulp.dest(paths.dest_css));
});

gulp.task('minifyHtml', function() {
  return gulp.src([paths.src_html])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.dest_html));
});


gulp.task('watcher', function () {
  gulp.watch([paths.src_sass, paths.dest_css], ['sass']);
});

gulp.task('default', ['sass', 'watcher']);
gulp.task('deploy', ['minifyHtml']);
