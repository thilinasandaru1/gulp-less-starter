var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var browserSync = require('browser-sync').create();

///////// Compile LESS
gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
        browsers: [
            'last 2 versions',
        ],
        cascade: false
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// create a task that ensures the `less` task is complete before
// reloading browsers
gulp.task('less-watch', ['less'], function (done) {
    browserSync.reload();
    done();
});


//// JavaScript





// Live Server with Browser Sync
// Static Server + watching less/js/html files
gulp.task('serve', ['less-watch'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("less/*.less", ['less-watch']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve']);