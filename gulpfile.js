var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');


gulp.task('styles', function(){
	return gulp.src('styles/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(concat('style.css'))
			.pipe(gulp.dest('styles/'));

});

gulp.task('jshint', function(){
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
	gulp.watch('styles/*scss', ['styles']);
	gulp.watch('js/*.js', ['jshint'])
});

gulp.task('default', ['watch']);