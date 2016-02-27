var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var sass = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jade'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['sass']);
    
	gulp.watch('./jade/*.jade', ['jade']);
	gulp.watch('./*.jade', ['jade']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css/"))
        .pipe(browserSync.stream());
});

// Compile jade into HTML
gulp.task('jade', function() {
	var YOUR_LOCALS = {
		pageTitle: 'cli-website'
	};

	gulp.src('./jade/*.jade')
	.pipe(jade({
		locals: YOUR_LOCALS
	}))
	.pipe(gulp.dest('./html/'));

	gulp.src('./*.jade')
	.pipe(jade({
		locals: YOUR_LOCALS
	}))
	.pipe(gulp.dest('./'));

	browserSync.reload();
});

gulp.task('default', ['serve']);