"use strict";

/*
 *
 *	REQUIRE SECTION
 *
 */

var	gulp			= require('gulp'), // Gulp JS
	del				= require('gulp-clean'),
	colors			= require('colors/safe'), // Раскрашиваем текст
	saneWatch		= require('gulp-sane-watch'), // Следим за файлами
	includeFile		= require('gulp-file-include'), // Инклюдинг файлов
	sequence 		= require('gulp-sequence'), // Последовательность выполения тасков

	browserSync		= require("browser-sync"), // http://www.browsersync.io/docs/gulp/
	notify			= browserSync.notify,
	reload			= browserSync.reload,

	stylus			= require('gulp-stylus'),
	base64			= require('gulp-base64'),
	urlAdjuster		= require('gulp-css-url-adjuster'), // Правим путь
	autoprefixer	= require('gulp-autoprefixer'), // Префиксы
	cleancss		= require('gulp-cleancss'), // Минификация CSS

	slim			= require('gulp-slim'),

	changed			= require('gulp-changed'), // Обрабатываем только измененные файлы(картинки)
	imagemin		= require('gulp-image'),// Минификация png, jpg, gif, svg.
	teenypng		= require('gulp-teenypng'),  // png & jpg < 5mb / 500 шт в месяц  -  https://tinypng.com

	uglify			= require('gulp-uglify'); // Минификация JS



/*
 *
 *	LOG SECTION
 *
 */

function log(error) {
	console.log([
		'',
		colors.red("---------- ERROR MESSAGE START ----------"),
		colors.red.inverse("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		colors.red("---------- ERROR MESSAGE END ------------"),
		''
	].join('\n'));
	this.end();
}



/*
 *
 *	STYLUS SECTION
 *
 */

gulp.task('stylus_dev', function() {
	return gulp.src(['./source/styl/[^-]*.styl', './source/styl/fonts/[^-]*.styl'])
		.pipe(stylus())
		.on('error', log)
		.pipe(base64({
			extensions: ['woff'],
			maxImageSize: 1024*1024 // 1 mb
		}))
		.pipe(urlAdjuster({
			replace:  ['../../img/','../img/']
		}))
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(gulp.dest('./frontend/css/'))
		.pipe(reload({stream:true}));
});



gulp.task('stylus_build', function () {
	return gulp.src(['./source/styl/[^-]*.styl', './source/styl/fonts/[^-]*.styl'])
		.pipe(stylus())
		.on('error', log)
		.pipe(base64({
			extensions: ['woff'],
			maxImageSize: 1024*1024 // 1 mb
		}))
		.pipe(urlAdjuster({
			replace:  ['../../img/','../../frontend/img/'] // Меняем пути чтобы брать минимизированные картинки для base63
		}))
		.pipe(base64({
			extensions: ['png','svg','jpg'],
			maxImageSize: 10*1024 // 10 kb
		}))
		.pipe(urlAdjuster({
			replace:  ['../../frontend/img/','../img/']
		}))
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(cleancss())
		.pipe(gulp.dest('./frontend/css/'));
});



/*
 *
 *	SLIM SECTION
 *
 */

// http://rubyinstaller.org/downloads/
// Ruby 2.1.5 (2 последних чекбокса в процессе установки )
// DevKit (распаковать в туже папку)
//
// Запускаем "Start Command Prompt with Ruby"
//
// ruby dk.rb init
// ruby dk.rb review
// ruby dk.rb install
// gem source --add http://rubygems.org
// gem install bundle slim
//
// (Путь до папки Ruby и DevKit)\lib\ruby\gems\2.1.0\gems\slim-3.0.2\lib\slim.rb
// require 'slim/include'
gulp.task('slim_dev', function () {
	return gulp.src('./source/slim/[^-]*.slim')
		.pipe(slim({
			pretty: true
		}))
		.on('error', log)
		.pipe(gulp.dest('./'))
		.pipe(reload({stream:true}));
});

gulp.task('slim_build', function () {
	return gulp.src('./source/slim/[^-]*.slim')
		.pipe(slim({
			pretty: true
		}))
		.on('error', log)
		.pipe(gulp.dest('./'));
});



/*
 *
 *	JAVASCRIPT SECTION
 *
 */

gulp.task('js_dev', function () {
	return gulp.src('./source/js/[^-]*.js')
		.pipe(includeFile())
		.pipe(gulp.dest('./frontend/js'))
		.pipe(reload({stream:true}));
});


gulp.task('js_build', function () {
	return gulp.src('./source/js/[^-]*.js')
		.pipe(includeFile())
		.pipe(uglify())
		.on('error', log)
		.pipe(gulp.dest('./frontend/js'));
});



/*
 *
 *	IMAGE SECTION
 *
 */

gulp.task('img_dev', function () {
	return gulp.src('./source/img/**/*')
		.pipe(changed('./frontend/img/'))
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'))
		.pipe(reload({stream:true}));
});

gulp.task('img_build', function () {
	return gulp.src(['./source/img/**/*.{svg,ico,gif}'])
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'));

	return gulp.src(['./source/img/**/*.{png,jpg}'])
		.pipe(teenypng({"apikey": "fCeE49eA1dVhUEepFD0-XuqQq7bTcr3J" }))
		.pipe(gulp.dest('./frontend/img/'));
});



/*
 *
 *	LOCAL SERVER SECTION
 *
 */


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./",
			proxy: "hoppas.dev",
			notify: true
		}
	});
});



/*
 *
 *	CLEAR SECTION
 *
 */

gulp.task('clean', function() {
	return gulp.src(['./frontend/','./*.html'], {read: false}).pipe(del({force: true}));
});



/*
 *
 *	WORK SECTION
 *
 */

// Собираем релиз
gulp.task('build', sequence(
	['clean'],
	['stylus_build','slim_build','js_build', 'img_build']
));


// Собираем дев
gulp.task('dev', sequence(
	['clean'],
	['stylus_dev','slim_dev','js_dev','img_dev']
));


// Cледим за изменениями
gulp.task('sane-watch', ['dev'], function() {

	gulp.start(['browser-sync']);

	saneWatch(['./source/styl/*.styl','./source/styl/fonts/*.styl'], {debounce: 500}, function() {
		gulp.start(['stylus_dev']);
	});

	saneWatch(['./source/slim/*.slim'], {debounce: 500}, function() {
		gulp.start(['slim_dev']);
	});

	saneWatch(['./source/js/*.js'], {debounce: 500}, function() {
		gulp.start(['js_dev']);
	});

	saneWatch(['./source/img/**/*'], {debounce: 500}, function() {
		gulp.start(['img_dev']);
	});
});

gulp.task('default', ['sane-watch']);
