const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function() {
    return gulp.src('./src/components/**/*.scss', './src/reusable/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/dist/css'))
});

gulp.task('watch', function (){
    gulp.watch(['./src/components/**/*.scss', './src/reusable/**/*.scss'], gulp.series('sass'));
})
gulp.task('default', 
gulp.series('sass', 'watch'));