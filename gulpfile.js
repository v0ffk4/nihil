//define components
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),

	//css processing
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	precss = require('precss'),

	//js processing
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),

	//define directories
	out = 'OUT/'
//	devTpl = 'dev/',
//	devImg = 'dev/images/',
//	devCss = 'dev/css/',
//	devJs = 'dev/js/'

//copy php
gulp.task('tplCp', function() {
	gulp.src('dev/*.{php,tpl,html}')
		.pipe(gulp.dest(out))
		.pipe(livereload());
});

//compile SASS synthax / minify
	gulp.task('cssPrep', function() {
		gulp.src('dev/style.css')
			.pipe(postcss([
				precss(),
				autoprefixer(),
				cssnano()
		]))
		.on('error', gutil.log)
		.pipe(gulp.dest(out + '/c'))
		.pipe(livereload());
	});

	//concatinate & minify & rename javascript
	gulp.task('jsConcat', function(){
		gulp.src([
			'dev/**/!(assembly)*.js',
			'dev/_common/assembly.js'
		])
			.pipe(concat('script.js'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(out + '/j'))
			.pipe(livereload());
	});

	//watch & process
	gulp.task('watch', function() {
		livereload.listen();
		gulp.watch('dev/*.{php,tpl,html}', ['tplCp']);
		gulp.watch('dev/**/*.css', ['cssPrep']);
		gulp.watch('dev/**/*.js', ['jsConcat']);
	});

gulp.task( 'default', [ 'tplCp', 'cssPrep', 'jsConcat', 'watch' ] );
//gulp.task( 'default', [ 'tplCp', 'cssPrep', 'jsConcat', 'watch' ] );
