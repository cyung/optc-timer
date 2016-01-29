var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var cdnizer = require("gulp-cdnizer");

gulp.task('default', ['watch']);

gulp.task('build', ['build-sass', 'build-css', 'copyCss', 'copyHtml', 'copyImages', 'copySounds',
         'copyImages', 'copyFavicon', 'build-vendor-js', 'build-js']);

gulp.task('build-sass', function() {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./src/styles'));
})
gulp.task('build-css', function() {
  return gulp.src([
      // './src/lib/bower/normalize-css/normalize.css',
      // './src/lib/bower/angular-material/angular-material.min.css',
      './src/lib/bower/angular-material-data-table/dist/md-data-table.min.css',
      './src/styles/*.css',
    ])
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('copyCss', function() {
  return gulp.src([
      './src/styles/main.css',
      './src/lib/bower/angular-material-data-table/dist/md-data-table.min.css',
    ])
    .pipe(gulp.dest('./public/styles'));
})

gulp.task('copyHtml', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('copySounds', function() {
  return gulp.src('./src/sounds/*')
    .pipe(gulp.dest('./public/sounds'));
})

gulp.task('copyImages', function() {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./public/images'));
})

gulp.task('copyFavicon', function() {
  return gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('./public'));
});

gulp.task('copyServiceWorker', function() {
  return gulp.src([
      './src/service-worker.js',
      './src/manifest.json'
    ])
    .pipe(gulp.dest('./public'));
})

gulp.task('build-vendor-js', function() {
  return gulp.src([
    // './src/lib/bower/angular/angular.min.js',
    // './src/lib/bower/angular-animate/angular-animate.min.js',
    // './src/lib/bower/angular-aria/angular-aria.min.js',
    // './src/lib/bower/angular-local-storage/dist/angular-local-storage.min.js',
    // './src/lib/bower/angular-material/angular-material.min.js',
    './src/lib/bower/angular-material-data-table/dist/md-data-table.min.js',
    // './src/lib/bower/angular-material-icons/angular-material-icons.min.js',
    './src/lib/bower/angular-translate/angular-translate.min.js',
    './src/lib/bower/angular-ui-router/release/angular-ui-router.min.js',
    // './src/lib/bower/moment/min/moment-with-locales.min.js',
    './src/lib/*.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/javascript'));
});

gulp.task('build-js', function() {
  return gulp.src([
      './src/app.js',
      './src/admin/*.js',
      './src/barrel/*.js',
      './src/config/*.js',
      './src/contact/*.js',
      './src/events/*.js',
      './src/turtle/*.js',
      './src/navbar/*.js',
      './src/settings/*.js',
      './src/route-config.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify({mangle: false}))
    // .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/javascript'));
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/*.scss', ['build-sass']);
  gulp.watch('./src/styles/*.css', ['build-css', 'copyCss']);
  gulp.watch('./src/sounds/*', ['copySounds']);
  gulp.watch('./src/images/*', ['copyImages']);
  gulp.watch('./src/favicon.ico', ['copyFavicon']);
  gulp.watch('./src/lib/**/*.js', ['build-vendor-js']);
  gulp.watch('./src/**/*.html', ['copyHtml']);
  gulp.watch('./src/**/*.js', ['build-js']);
});