var gulp = require('gulp');
var nodemon = require('nodemon');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('scripts', cb => {
  let s1 = gulp.src(['public/javascripts/**/*.js'])
    .pipe(gulp.dest('dist/scripts'));
  return s1;
});
gulp.task('sass', cb => {
  let s1 = gulp.src('public/stylesheets/**/*.sass')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/styles/'));
  return s1;
});
gulp.task('styles', ['sass'], cb => {
  let s1 = gulp.src('public/stylesheets/*.css')
    .pipe(gulp.dest('dist/styles'));
  return s1;
});
gulp.task('img', cb => {
  let s1 = gulp.src('public/images/*')
    .pipe(gulp.dest('dist/images'));
  return s1;
});
gulp.task('build:watch', cb => {
  gulp.watch('public/javascripts/*.js', ['scripts']);
  gulp.watch('public/stylesheets/*.sass', ['styles']);
});
gulp.task('nodemon', cb => {
  let started = false;
  return nodemon({
    script: 'app.js',
    watch: ['routes/*.js', 'app.js'],
    env: { 'NODE_ENV': 'dev' },
    ignore: ['dist/scripts/*.js', 'public/javascripts/*.js'],
  }).on('start', e => {
    if (!started) {
      started = true;
      cb();
    }
    started = true;
  });
});
gulp.task('browserSync', ['nodemon'], cb => {
  browserSync.init(null, {
    https: true,
    proxy: 'http://localhost:4000',
    files: ['dist/**/**.*', 'views/**'],
    browser: ['chrome'],
    port: 5000,
    reloadDelay: 1000
  })
});
gulp.task('start', ['clean'], cb => {
  runSequence(['scripts', 'styles', 'img'], cb => {
    runSequence(['build:watch', 'browserSync']);
  });
});