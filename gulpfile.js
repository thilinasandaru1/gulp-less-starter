var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync').create();

// Compile LESS
gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// Live Server with Browser Sync
// Static Server + watching less/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("less/*.less", ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve']);